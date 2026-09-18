import { SignUp } from '@clerk/nextjs'

import AuthShell from '@/components/auth-shell'

export const metadata = {
  title: 'Create your workspace — ScholarFlow',
}

export default function SignUpPage() {
  return (
    <AuthShell>
      <SignUp
        appearance={{
          elements: {
            card: 'bg-card/60 backdrop-blur-xl border border-border shadow-none',
            headerTitle: 'text-foreground',
            headerSubtitle: 'text-muted-foreground',
            socialButtonsBlockButton:
              'border-border bg-transparent hover:bg-muted text-foreground',
            formFieldLabel: 'text-muted-foreground',
            formFieldInput:
              'bg-input/30 border-border text-foreground focus:ring-ring/40',
            formButtonPrimary:
              'bg-primary text-primary-foreground shadow-none hover:bg-primary/80',
            footerActionLink: 'text-primary hover:text-primary/80',
            dividerLine: 'bg-border',
            dividerText: 'text-muted-foreground',
          },
        }}
      />
    </AuthShell>
  )
}
