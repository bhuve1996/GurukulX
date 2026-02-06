import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn" },
  { href: "/today", label: "Today" },
  { href: "/saved", label: "Saved" },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex max-w-container flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="text-lg font-semibold text-neutral-900 no-underline hover:text-neutral-700"
          >
            GurukulX
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 no-underline hover:bg-neutral-100 hover:text-neutral-900 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-container px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
