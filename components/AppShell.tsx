import Link from "next/link";
import { ui } from "@/lib/config";

const navLinks = [
  { href: "/", label: ui.nav.home },
  { href: "/learn", label: ui.nav.learn },
  { href: "/today", label: ui.nav.today },
  { href: "/saved", label: ui.nav.saved },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex max-w-container flex-wrap items-center justify-between gap-2 px-3 py-2 sm:px-6 sm:py-2">
          <Link
            href="/"
            className="text-base font-semibold text-neutral-900 no-underline hover:text-neutral-700"
          >
            {ui.site.name}
          </Link>
          <nav className="flex items-center gap-0.5 sm:gap-2" aria-label={ui.nav.mainAria}>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg px-2 py-1.5 text-xs font-medium text-neutral-600 no-underline hover:bg-neutral-100 hover:text-neutral-900 min-h-[36px] min-w-[36px] flex items-center justify-center sm:px-3 sm:py-2 sm:text-sm sm:min-h-[44px] sm:min-w-[44px]"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-container overflow-x-hidden px-4 py-4 sm:px-6 sm:py-6">
        {children}
      </main>
    </div>
  );
}
