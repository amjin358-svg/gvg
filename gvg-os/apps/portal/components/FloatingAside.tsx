"use client";

import Link from "next/link";
import { IconChat, IconMail, IconTop, IconWhatsApp } from "@/components/icons";

export function FloatingAside() {
  return (
    <>
      <aside className="float-rail" aria-label="快捷聯絡">
        <Link href="/contact#chat" className="float-rail__item">
          <IconChat />
          <span>線上客服</span>
        </Link>
        <Link href="/contact" className="float-rail__item">
          <IconMail />
          <span>聯絡我們</span>
        </Link>
        <a
          href="https://wa.me/"
          className="float-rail__item"
          target="_blank"
          rel="noreferrer"
        >
          <IconWhatsApp />
          <span>WhatsApp</span>
        </a>
      </aside>

      <button
        type="button"
        className="back-top"
        aria-label="回到頂部"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <IconTop />
      </button>
    </>
  );
}

export default FloatingAside;
