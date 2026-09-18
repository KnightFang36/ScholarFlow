import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-foreground">
              Scholar<span className="text-primary">Flow</span>
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-1">
            <Link
              href="/dashboard"
              className="rounded-md px-2 py-1 text-xs font-mono uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/workspace-area"
              className="rounded-md px-2 py-1 text-xs font-mono uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Workspace area
            </Link>
          </nav>
        </div>

        <UserButton />
      </header>

      <main className="flex-1 px-6 py-8">{children}</main>
    </div>
  );
}