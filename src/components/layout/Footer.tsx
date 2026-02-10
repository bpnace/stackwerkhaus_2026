import Image from "next/image";

import { TransitionLink } from "@/components/ui/TransitionLink";


const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/cookie-richtlinien", label: "Cookie-Richtlinien" },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/stackwerkhaus",
    label: "Instagram",
    icon: (
      <Image
        src="/images/logos/instagram_icon.svg"
        alt=""
        width={20}
        height={20}
      />
    ),
  },
  {
    href: "https://www.linkedin.com/in/tarik-arthur-marshall-6112b2239",
    label: "LinkedIn",
    icon: (
      <Image
        src="/images/logos/LinkedIn_icon.svg"
        alt=""
        width={20}
        height={20}
      />
    ),
  },
];

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[rgba(243,239,230,0.85)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 text-sm md:flex-row md:items-start md:justify-between md:px-10">
        <div className="space-y-2">
          <p className="font-display font-bold text-xl uppercase tracking-[0.2em]">
            STACKWERKHAUS
          </p>
          <p className="text-ink-soft">
            Webdesign aus Berlin // klar, schnell und ohne Technikstress.
          </p>
          <a
            href="mailto:info@stackwerkhaus.de"
            className="text-ink-soft hover:text-foreground"
          >
            info@stackwerkhaus.de
          </a>
        </div>

        <div className="flex flex-col gap-6 text-xs uppercase tracking-[0.3em]">
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                className="text-ink-soft hover:text-foreground"
              >
                {link.label}
              </TransitionLink>
            ))}
          </div>
          <div className="flex items-center justify-between gap-6">
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
            <div className="flex items-center gap-3">
              <Image
                src="/images/eu_lock.svg"
                alt="EU Lock"
                width={54}
                height={64}
                className="opacity-80"
              />
              <Image
                src="/images/logos/eu_hoster.png"
                alt="EU Hoster"
                width={76}
                height={86}
                className="opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
