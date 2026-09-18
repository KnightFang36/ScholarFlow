import Link from 'next/link'

/**
 * Shared shell for auth pages — pitch-black backdrop with the same grid,
 * glow and shine motifs as the landing page.
 */
export default function AuthShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-12">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[480px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[120px]"
        style={{
          background:
            'radial-gradient(closest-side, oklch(0.97 0 0 / 0.18), transparent)',
        }}
      />

      {/* Decorative grid */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <pattern
            id="auth-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="oklch(1 0 0 / 5%)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#auth-grid)" />
      </svg>

      {/* Floating corner accents */}
      <div className="pointer-events-none absolute inset-4 border oklch(1 0 0 / 6%) md:inset-8" />

      <div className="relative z-10 w-full max-w-md">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-1 text-sm font-mono font-semibold tracking-tight"
        >
          <span className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
            Scholar
          </span>
          <span className="text-foreground">Flow</span>
        </Link>
        {children}
      </div>
    </div>
  )
}
