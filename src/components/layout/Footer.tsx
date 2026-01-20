const socialLinks = [
  {
    href: "https://www.instagram.com/stackwerkhaus",
    label: "Instagram",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.3" cy="6.7" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/tarik-arthur-marshall-6112b2239",
    label: "LinkedIn",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 10v6" />
        <path d="M8 8v.01" />
        <path d="M12 16v-3a2 2 0 0 1 4 0v3" />
        <path d="M12 10v6" />
      </svg>
    ),
  },
];

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
];

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[rgba(243,239,230,0.85)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 text-sm md:flex-row md:items-center md:justify-between md:px-10">
        <div className="space-y-2">
          <p className="font-display text-xl uppercase tracking-[0.2em]">
            STACKWERKHAUS
          </p>
          <p className="text-ink-soft">
            Webdesign aus Berlin – klar, schnell und ohne Technikstress.
          </p>
          <a
            href="mailto:info@stackwerkhaus.de"
            className="text-ink-soft hover:text-foreground"
          >
            info@stackwerkhaus.de
          </a>
        </div>

        <div className="flex flex-col gap-6 text-xs uppercase tracking-[0.3em]">
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noreferrer"
                className="text-ink-soft transition-colors hover:text-foreground"
              >
                {link.icon}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-ink-soft hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
