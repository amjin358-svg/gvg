# @gvg/ai — AI Brain

## Infrastructure

| Module | Path |
|---|---|
| AI Gateway | `src/gateway` |
| Prompt Manager | `src/prompts` |
| Knowledge Base | `src/knowledge` |
| Tool Registry | `src/tools` |
| Agent Registry | `src/agent-registry` |

## Agents

Procurement · Trade · Logistics · Customer · Finance · Marketing · Legal · Translation · Executive

```ts
import { gateway } from "@gvg/ai";

const res = await gateway.chat({
  input: "幫我起草保健品 RFQ",
  useKnowledge: true,
});
```
