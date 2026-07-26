#!/usr/bin/env python3
"""Minimal Stitch MCP JSON-RPC client (API key from /workspace/.env)."""

from __future__ import annotations

import argparse
import base64
import json
import os
import ssl
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path("/workspace")
ENV_PATH = ROOT / ".env"
MCP_URL = "https://stitch.googleapis.com/mcp"


def load_api_key() -> str:
    if os.environ.get("STITCH_API_KEY"):
        return os.environ["STITCH_API_KEY"].strip().strip('"')
    text = ENV_PATH.read_text()
    for line in text.splitlines():
        if line.startswith("STITCH_API_KEY="):
            return line.split("=", 1)[1].strip().strip('"')
    raise SystemExit("STITCH_API_KEY not found in env or .env")


def rpc(method: str, params: dict | None = None, timeout: int = 60) -> dict:
    key = load_api_key()
    payload: dict = {"jsonrpc": "2.0", "id": 1, "method": method}
    if params is not None:
        payload["params"] = params
    data = json.dumps(payload).encode()
    req = urllib.request.Request(
        MCP_URL,
        data=data,
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json, text/event-stream",
            "X-Goog-Api-Key": key,
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(
            req, context=ssl.create_default_context(), timeout=timeout
        ) as resp:
            raw = resp.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        raise SystemExit(f"HTTP {e.code}: {body[:2000]}") from e
    except TimeoutError as e:
        raise SystemExit(f"TIMEOUT calling {method} after {timeout}s") from e

    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        for line in raw.splitlines():
            if line.startswith("data:"):
                body = line[5:].strip()
                if body and body != "[DONE]":
                    return json.loads(body)
        raise SystemExit(f"Unparsed response: {raw[:800]}")


def call_tool(name: str, arguments: dict, timeout: int = 300) -> dict:
    res = rpc("tools/call", {"name": name, "arguments": arguments}, timeout=timeout)
    if "error" in res:
        raise SystemExit(json.dumps(res["error"], indent=2))
    result = res.get("result", {})
    # MCP tool results often wrap content as text JSON
    content = result.get("content")
    if isinstance(content, list) and content:
        texts = []
        for item in content:
            if isinstance(item, dict) and item.get("type") == "text":
                texts.append(item.get("text", ""))
        joined = "\n".join(texts).strip()
        if joined:
            try:
                return json.loads(joined)
            except json.JSONDecodeError:
                return {"rawText": joined, "result": result}
    return result


def download(url: str, dest: Path, timeout: int = 120) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "gvg-stitch-loop/1.0"})
    with urllib.request.urlopen(
        req, context=ssl.create_default_context(), timeout=timeout
    ) as resp:
        dest.write_bytes(resp.read())
    print(f"Wrote {dest} ({dest.stat().st_size} bytes)")


def cmd_create_project(args: argparse.Namespace) -> None:
    out = call_tool("create_project", {"title": args.title}, timeout=120)
    print(json.dumps(out, indent=2))


def cmd_get_project(args: argparse.Namespace) -> None:
    name = args.name if args.name.startswith("projects/") else f"projects/{args.name}"
    out = call_tool("get_project", {"name": name}, timeout=120)
    print(json.dumps(out, indent=2))


def cmd_generate(args: argparse.Namespace) -> None:
    prompt = Path(args.prompt_file).read_text()
    # Strip YAML frontmatter if present
    if prompt.startswith("---"):
        parts = prompt.split("---", 2)
        if len(parts) >= 3:
            prompt = parts[2].strip()
    arguments = {
        "projectId": args.project_id,
        "prompt": prompt,
        "deviceType": args.device_type,
        "modelId": args.model,
    }
    if args.design_system:
        arguments["designSystem"] = args.design_system
    print(
        f"Generating screen (device={args.device_type}, model={args.model}) …",
        flush=True,
    )
    t0 = time.time()
    out = call_tool("generate_screen_from_text", arguments, timeout=args.timeout)
    print(f"Done in {time.time() - t0:.1f}s", flush=True)
    print(json.dumps(out, indent=2))


def cmd_list_screens(args: argparse.Namespace) -> None:
    out = call_tool("list_screens", {"projectId": args.project_id}, timeout=120)
    print(json.dumps(out, indent=2))


def cmd_get_screen(args: argparse.Namespace) -> None:
    name = (
        args.name
        if args.name.startswith("projects/")
        else f"projects/{args.project_id}/screens/{args.name}"
    )
    out = call_tool(
        "get_screen",
        {
            "name": name,
            "projectId": args.project_id,
            "screenId": args.screen_id or name.rsplit("/", 1)[-1],
        },
        timeout=120,
    )
    print(json.dumps(out, indent=2))


def cmd_upload_design_md(args: argparse.Namespace) -> None:
    raw = Path(args.file).read_bytes()
    b64 = base64.b64encode(raw).decode("ascii")
    out = call_tool(
        "upload_design_md",
        {"projectId": args.project_id, "designMdBase64": b64},
        timeout=180,
    )
    print(json.dumps(out, indent=2))


def cmd_download(args: argparse.Namespace) -> None:
    download(args.url, Path(args.dest))


def main() -> None:
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd", required=True)

    c = sub.add_parser("create-project")
    c.add_argument("--title", required=True)
    c.set_defaults(func=cmd_create_project)

    g = sub.add_parser("get-project")
    g.add_argument("--name", required=True)
    g.set_defaults(func=cmd_get_project)

    gen = sub.add_parser("generate")
    gen.add_argument("--project-id", required=True)
    gen.add_argument("--prompt-file", required=True)
    gen.add_argument("--device-type", default="DESKTOP")
    gen.add_argument("--model", default="GEMINI_3_1_PRO")
    gen.add_argument("--design-system", default="")
    gen.add_argument("--timeout", type=int, default=600)
    gen.set_defaults(func=cmd_generate)

    ls = sub.add_parser("list-screens")
    ls.add_argument("--project-id", required=True)
    ls.set_defaults(func=cmd_list_screens)

    gs = sub.add_parser("get-screen")
    gs.add_argument("--project-id", required=True)
    gs.add_argument("--name", required=True)
    gs.add_argument("--screen-id", default="")
    gs.set_defaults(func=cmd_get_screen)

    up = sub.add_parser("upload-design-md")
    up.add_argument("--project-id", required=True)
    up.add_argument("--file", required=True)
    up.set_defaults(func=cmd_upload_design_md)

    dl = sub.add_parser("download")
    dl.add_argument("--url", required=True)
    dl.add_argument("--dest", required=True)
    dl.set_defaults(func=cmd_download)

    args = p.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
