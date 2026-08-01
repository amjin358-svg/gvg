"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Globe2,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { BRAND, PRIMARY_NAV, UTILITY_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Mockup-accurate 3-tier platform chrome:
 * 1) thin utility bar
 * 2) logo + search + account/cart
 * 3) primary module navigation
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Tier 1 — utility */}
      <div className="bg-[var(--color-navy)] text-white">
        <Container className="flex h-9 items-center justify-between gap-4 text-xs">
          <p className="truncate text-white/80">
            歡迎來到 GVG Global Trade Platform
          </p>
          <div className="flex items-center gap-3 sm:gap-4">
            {UTILITY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hidden text-white/85 hover:text-white sm:inline"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              className="inline-flex items-center gap-1 text-white/85 hover:text-white"
              aria-label="語言"
            >
              <Globe2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">繁體中文</span>
            </button>
          </div>
        </Container>
      </div>

      {/* Tier 2 — brand + search + account */}
      <div className="border-b border-[var(--color-line)] bg-white">
        <Container className="flex h-16 items-center gap-4 lg:h-[4.5rem]">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/gvg-mark.svg" alt="GVG" className="h-10 w-10" />
            <span className="leading-tight">
              <span className="block font-[family-name:var(--font-display)] text-base font-semibold text-[var(--color-navy)]">
                {BRAND.shortName}{" "}
                <span className="hidden font-medium text-[var(--color-gold-strong)] sm:inline">
                  GLOBAL VISTA GROUP
                </span>
              </span>
              <span className="hidden text-[11px] tracking-[0.08em] text-[var(--color-muted)] md:block">
                Global Trade Platform
              </span>
            </span>
          </Link>

          <form
            className="mx-auto hidden max-w-2xl flex-1 md:flex"
            action="/products"
            method="get"
            role="search"
          >
            <label className="sr-only" htmlFor="global-search">
              搜尋商品、品牌、類別
            </label>
            <div className="flex h-11 w-full overflow-hidden rounded-full border border-[var(--color-line)] bg-[var(--color-mist)]">
              <input
                id="global-search"
                name="q"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜尋商品、品牌、類別..."
                className="w-full bg-transparent px-4 text-sm text-[var(--color-ink)] outline-none"
              />
              <button
                type="submit"
                className="bg-[var(--color-navy)] px-4 text-white"
                aria-label="搜尋"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="ml-auto hidden items-center gap-4 text-sm text-[var(--color-muted)] lg:flex">
            <Link
              href="/portal/customer"
              className="inline-flex items-center gap-1.5 hover:text-[var(--color-navy)]"
            >
              <UserRound className="h-4 w-4" />
              登入 / 註冊
            </Link>
            <Link
              href="/rfq"
              className="relative inline-flex items-center gap-1.5 hover:text-[var(--color-navy)]"
              aria-label="購物車／詢價籃"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>購物車</span>
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-navy)] px-1 text-[10px] font-bold text-white">
                2
              </span>
            </Link>
          </div>

          <button
            type="button"
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded text-[var(--color-navy)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">選單</span>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </Container>
      </div>

      {/* Tier 3 — primary modules */}
      <nav
        className="hidden border-b border-[var(--color-line)] bg-white lg:block"
        aria-label="主選單"
      >
        <Container className="flex h-12 items-center gap-1 xl:gap-2">
          {PRIMARY_NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`) ||
                  (item.href === "/products" && pathname.startsWith("/categories"));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex h-full items-center px-3 text-sm font-medium transition-colors xl:px-4",
                  active
                    ? "text-[var(--color-navy)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-navy)]",
                )}
              >
                {item.label}
                {active ? (
                  <span className="absolute inset-x-3 bottom-0 h-0.5 bg-[var(--color-navy)] xl:inset-x-4" />
                ) : null}
              </Link>
            );
          })}
        </Container>
      </nav>

      <div
        id="mobile-nav"
        className={cn(
          "border-b border-[var(--color-line)] bg-white lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          <form action="/products" method="get" className="mb-3">
            <input
              name="q"
              placeholder="搜尋商品、品牌、類別..."
              className="h-10 w-full rounded-md border border-[var(--color-line)] px-3 text-sm"
            />
          </form>
          {[...PRIMARY_NAV, ...UTILITY_NAV].map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className="rounded px-2 py-2.5 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-mist)]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/portal/customer"
            className="rounded px-2 py-2.5 text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            登入 / 註冊
          </Link>
        </Container>
      </div>
    </header>
  );
}
