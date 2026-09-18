import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'
import {
  FilesIcon,
  FolderKanbanIcon,
  MessageSquareTextIcon,
  PlusIcon,
  SparklesIcon,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

// Frontend-only placeholder data — swap for Prisma queries when the API lands.
const WORKSPACES = [
  {
    id: 'w1',
    name: 'Neural Networks 401',
    description: 'Lecture notes, papers and exam prep for deep learning.',
    documents: 12,
    chats: 34,
    role: 'OWNER' as const,
    updatedAt: '2 hours ago',
  },
  {
    id: 'w2',
    name: 'Distributed Systems',
    description: 'Reading group: consensus, replication, and CAP.',
    documents: 8,
    chats: 19,
    role: 'ADMIN' as const,
    updatedAt: 'yesterday',
  },
  {
    id: 'w3',
    name: 'Thesis — Retrieval-Augmented Generation',
    description: 'Sources, summaries and chapter drafts.',
    documents: 27,
    chats: 102,
    role: 'MEMBER' as const,
    updatedAt: '3 days ago',
  },
]

const ROLE_STYLES: Record<string, string> = {
  OWNER: 'bg-primary text-primary-foreground',
  ADMIN: 'bg-secondary text-secondary-foreground',
  MEMBER: 'bg-muted text-muted-foreground',
}

function WorkspaceCard({ workspace }: { workspace: (typeof WORKSPACES)[number] }) {
  return (
    <Link href={`/workspace/${workspace.id}`} className="group h-full">
      <Card className="h-full bg-card/60 ring-1 ring-foreground/10 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-card group-hover:ring-foreground/25 group-hover:shadow-[0_0_32px_rgba(255,255,255,0.08)]">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-muted/60 text-foreground/80">
              <FolderKanbanIcon className="size-4" />
            </div>
            <Badge variant="outline" className={cn('border-transparent', ROLE_STYLES[workspace.role])}>
              {workspace.role}
            </Badge>
          </div>
          <CardTitle className="mt-2 text-foreground">{workspace.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {workspace.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <FilesIcon className="size-3" />
                {workspace.documents}
              </span>
              <span className="inline-flex items-center gap-1">
                <MessageSquareTextIcon className="size-3" />
                {workspace.chats}
              </span>
            </div>
            <span>Updated {workspace.updatedAt}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default async function WorkspaceAreaPage() {
  const user = await currentUser()

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Heading row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Workspace area
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Welcome back, {user?.firstName ?? 'Scholar'}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick a workspace to continue, or spin up a new one.
          </p>
        </div>

        <Button
          render={
            <Link href="/workspaces/new" className="workspace-create-btn font-mono" />
          }
        >
          <PlusIcon />
          New workspace
        </Button>
      </div>

      {/* Quick stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Active workspaces', value: WORKSPACES.length },
          {
            label: 'Documents',
            value: WORKSPACES.reduce((sum, w) => sum + w.documents, 0),
          },
          {
            label: 'AI chats',
            value: WORKSPACES.reduce((sum, w) => sum + w.chats, 0),
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card/50 px-5 py-4"
          >
            <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
            <div className="mt-0.5 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Workspace grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WORKSPACES.map((workspace) => (
          <WorkspaceCard key={workspace.id} workspace={workspace} />
        ))}

        {/* Create-new tile */}
        <Link
          href="/workspaces/new"
          className="group flex min-h-44 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border text-muted-foreground transition-all hover:border-foreground/40 hover:text-foreground hover:shadow-[0_0_24px_rgba(255,255,255,0.06)]"
        >
          <span className="flex size-9 items-center justify-center rounded-full border border-border transition-colors group-hover:border-foreground/40">
            <PlusIcon className="size-4" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.15em]">
            Create workspace
          </span>
        </Link>
      </div>

      {/* AI prompt strip */}
      <div className="mt-10 rounded-xl border border-border bg-card/40 p-6">
        <div className="flex items-center gap-2">
          <SparklesIcon className="size-4 text-foreground/80" />
          <h2 className="text-sm font-semibold text-foreground">
            Ask across all workspaces
          </h2>
        </div>
        <div className="mt-3 flex gap-2">
          <Input
            placeholder="e.g. Summarize everything I've read about transformer architectures…"
            className="h-10 bg-input/20"
          />
          <Button className="h-10 font-mono" variant="outline">
            Ask
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Frontend preview — AI answers arrive once the backend is wired up.
        </p>
      </div>

      <style>{`
        .workspace-create-btn {
          background-image: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.9) 50%, transparent 70%);
          background-size: 250% 100%;
          background-position: -100% center;
          transition: background-position 0.6s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .workspace-create-btn:hover {
          background-position: 100% center;
          box-shadow: 0 0 30px rgba(255,255,255,0.3);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  )
}
