'use client'

import Link from 'next/link'
import { useState } from 'react'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav
        className="flex items-center justify-between px-6 py-4 sm:px-8 md:px-12 border-b border-border/60 backdrop-blur-xl"
        style={{ backgroundColor: 'oklch(0.06 0 0 / 72%)' }}
      >
        {/* Left: logo + primary links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-sm font-mono font-semibold tracking-tight navbar-shine">
            ScholarFlow
          </Link>
          <ul className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs font-mono uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors relative navbar-link"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: auth actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-xs sm:text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="text-xs sm:text-sm font-mono px-4 py-2 rounded-md border border-border text-foreground hover:border-foreground/50 hover:shadow-[0_0_18px_rgba(255,255,255,0.15)] transition-all"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden flex flex-col gap-1.5 p-2"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className={`block h-px w-5 bg-foreground transition-transform ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
          <span className={`block h-px w-5 bg-foreground transition-transform ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div
          className="sm:hidden flex flex-col gap-4 px-6 py-6 border-b border-border/60 backdrop-blur-xl"
          style={{ backgroundColor: 'oklch(0.06 0 0 / 90%)' }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-xs font-mono uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 pt-2">
            <Link
              href="/sign-in"
              onClick={() => setOpen(false)}
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              onClick={() => setOpen(false)}
              className="text-xs font-mono px-4 py-2 rounded-md border border-border text-foreground hover:border-foreground/50 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}

      <style>{`
        .navbar-shine {
          background-image: linear-gradient(100deg, oklch(0.7 0 0) 0%, oklch(0.7 0 0) 40%, oklch(1 0 0) 50%, oklch(0.7 0 0) 60%, oklch(0.7 0 0) 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: navbar-shine-sweep 6s linear infinite;
        }
        @keyframes navbar-shine-sweep {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .navbar-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 0;
          height: 1px;
          background: oklch(1 0 0 / 70%);
          transition: width 0.25s ease;
        }
        .navbar-link:hover::after {
          width: 100%;
        }
      `}</style>
    </header>
  )
}
