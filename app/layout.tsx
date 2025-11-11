import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tacksamhetsvideogenerator',
  description: 'Automatiserad skapare av tacksamhetsvideos för YouTube',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>{children}</body>
    </html>
  )
}
