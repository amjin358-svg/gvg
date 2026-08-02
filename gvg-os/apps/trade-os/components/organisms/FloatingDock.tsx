"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, Headset, Mail, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function FloatingDock() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3 sm:right-6">
      {!isHome ? (
      <aside className="hidden overflow-hidden rounded-md bg-[var(--color-navy)] text-white shadow-lg md:block">
        <Link
          href="/contact"
          className="flex items-center gap-2 border-b border-white/10 px-3 py-3 text-xs hover:bg-white/10"
        >
          <Headset className="h-4 w-4" />
          線上客服
        </Link>
        <Link
          href="/contact"
          className="flex items-center gap-2 border-b border-white/10 px-3 py-3 text-xs hover:bg-white/10"
        >
          <Mail className="h-4 w-4" />
          聯絡我們
        </Link>
        <a
          href="https://wa.me/886900000000"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-3 py-3 text-xs hover:bg-white/10"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      </aside>
      ) : null}

      {showTop ? (
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-navy)] text-white shadow-lg"
          aria-label="回到頂部"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
