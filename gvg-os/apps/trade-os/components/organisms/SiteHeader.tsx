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

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Navy utility + search band */}
      <div className="bg-[var(--color-navy)] text-white">
        <Container className="flex h-16 items-center gap-4 lg:h-[4.25rem]">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/gvg-mark.svg" alt="GVG" className="h-9 w-9 brightness-110" />
            <span className="leading-tight">
              <span className="block font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide text-[var(--color-gold)] sm:text-base">
                {BRAND.shortName}
              </span>
              <span className="hidden text-[10px] uppercase tracking-[0.14em] text-white/80 sm:block">
                Global Vista Group
              </span>
            </span>
          </Link>

          <form
            className="mx-auto hidden max-w-2xl flex-1 md:flex"
            action="/marketplace"
            method="get"
            role="search"
          >
            <label className="sr-only" htmlFor="global-search">
              搜尋商品、品牌、類別
            </label>
            <div className="flex h-11 w-full overflow-hidden rounded-full bg-white shadow-sm">
              <input
                id="global-search"
                name="q"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜尋商品、品牌、類別..."
                className="w-full bg-transparent px-4 text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-muted)]"
              />
              <button
                type="submit"
                className="px-4 text-[var(--color-navy)]"
                aria-label="搜尋"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="ml-auto hidden items-center gap-3 text-xs text-white/85 lg:flex xl:gap-4 xl:text-sm">
            {UTILITY_NAV.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              className="inline-flex items-center gap-1 hover:text-white"
              aria-label="語言"
            >
              <Globe2 className="h-4 w-4" />
              繁體中文
            </button>
            <Link
              href="/portal/customer"
              className="inline-flex items-center gap-1 hover:text-white"
            >
              <UserRound className="h-4 w-4" />
              登入 / 註冊
            </Link>
            <Link
              href="/marketplace"
              className="relative inline-flex items-center hover:text-white"
              aria-label="購物車"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-gold)] px-1 text-[10px] font-bold text-[var(--color-navy)]">
                2
              </span>
            </Link>
          </div>

          <button
            type="button"
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">選單</span>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </Container>
      </div>

      {/* White primary nav */}
      <nav className="hidden border-b border-[var(--color-line)] bg-white lg:block" aria-label="主選單">
        <Container className="flex h-12 items-center gap-7">
          {PRIMARY_NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative h-full content-center text-sm font-medium transition-colors",
                  active
                    ? "text-[var(--color-navy)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-navy)]",
                )}
              >
                {item.label}
                {active ? (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[var(--color-navy)]" />
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
          <form action="/marketplace" method="get" className="mb-3">
            <input
              name="q"
              placeholder="搜尋商品、品牌、類別..."
              className="h-10 w-full rounded-md border border-[var(--color-line)] px-3 text-sm"
            />
          </form>
          {[...PRIMARY_NAV, ...UTILITY_NAV, ...PORTAL_LINKS].map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className="rounded px-2 py-2.5 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-mist)]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </Container>
      </div>
    </header>
  );
}

const PORTAL_LINKS = [
  { label: "登入 / 註冊", href: "/portal/customer" },
  { label: "客戶入口", href: "/portal/customer" },
  { label: "供應商入口", href: "/portal/supplier" },
];
