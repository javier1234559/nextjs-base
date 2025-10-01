import React from 'react'
import { Audiowide, Inter } from 'next/font/google'
import { constructMetadata } from '@/utils'
import MainProvider from '@/providers/main-provider'
import { cn } from '@/utils/cn'

import './globals.scss'

const fontText = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-text',
})

const fontHeading = Audiowide({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-heading',
})

export const metadata = constructMetadata()

export default async function RootLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <html lang="en" className="light">
      <body
        className={cn(
          fontText.variable,
          fontHeading.variable,
          'flex min-h-screen flex-col antialiased',
        )}
      >
        <MainProvider>
          <main className="flex flex-1 flex-col">{children}</main>
        </MainProvider>
      </body>
    </html>
  )
}
