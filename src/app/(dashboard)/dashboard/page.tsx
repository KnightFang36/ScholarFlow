import { currentUser } from '@clerk/nextjs/server'

export default async function DashboardPage() {
  const user = await currentUser()

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold text-foreground">
        Welcome back, {user?.firstName ?? 'Scholar'}
      </h1>
      <p className="mt-2 text-muted-foreground">
        Your AI-powered knowledge workspace is ready.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold text-foreground">Workspaces</h2>
          <p className="mt-1 text-sm text-muted-foreground">Create and manage your knowledge spaces.</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold text-foreground">Documents</h2>
          <p className="mt-1 text-sm text-muted-foreground">Upload PDFs, notes, and more.</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold text-foreground">AI Chat</h2>
          <p className="mt-1 text-sm text-muted-foreground">Chat with your documents using AI.</p>
        </div>
      </div>
    </div>
  )
}