type IconProps = { className?: string };

export function IconGlobe({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9S14.5 18.2 12 21c-2.5-2.8-3.8-5.8-3.8-9S9.5 5.8 12 3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function IconUser({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M5 19c1.8-3.2 4.2-4.8 7-4.8s5.2 1.6 7 4.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function IconChat({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="20" height="20" aria-hidden>
      <path
        d="M5 6.5A3.5 3.5 0 0 1 8.5 3h7A3.5 3.5 0 0 1 19 6.5v5A3.5 3.5 0 0 1 15.5 15H10l-4 3.5V6.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function IconMail({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="20" height="20" aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4.5 7.5 12 13l7.5-5.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function IconWhatsApp({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="20" height="20" aria-hidden>
      <path
        d="M12 3.5a8 8 0 0 0-6.9 12.1L4.2 20.5l5-1.1A8 8 0 1 0 12 3.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M9.2 9.4c.3-.6.6-.6.9-.6h.7c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .5-.2.6l-.5.4c-.2.2-.2.4 0 .7.4.7 1.2 1.5 2 1.9.3.2.5.1.7-.1l.5-.5c.2-.2.5-.2.7 0l1.5.9c.3.2.4.4.3.7-.2.6-.9 1.4-1.8 1.4-.2 0-.5 0-1.1-.2-2.6-.8-4.6-2.9-5.4-5.5-.2-.6-.2-1.1-.1-1.5.1-.5.5-.9.7-1.1z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconArrow({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="16" height="16" aria-hidden>
      <path
        d="M5 12h12M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconTop({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path
        d="M12 18V7M6.5 11.5 12 6l5.5 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

const SERVICE_PATHS = [
  "M4 16h16M6 16V9l6-4 6 4v7M10 16v-4h4v4",
  "M5 18V7l7-3 7 3v11M9 18v-5h6v5",
  "M4 7h16v3H4zm2 3v8h4v-8m4 0v8h4v-8",
  "M3 16h18M5 16l2-7h10l2 7M8 9V6h8v3",
  "M7 4h10v4H7zm1 4v12h8V8M9 12h6",
  "M6 18V8l6-4 6 4v10M10 18v-5h4v5",
];

export function ServiceIcon({ index }: { index: number }) {
  const d = SERVICE_PATHS[index % SERVICE_PATHS.length];
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
