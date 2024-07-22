'use client'

import { memo, ReactNode } from 'react'
import isEqual from 'react-fast-compare'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

import AuthProvider from '@/providers/auth-provider'
import { extendTheme } from '@/theme/extend-theme'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

interface Props {
  children: ReactNode
}

async function MainProviders({ children }: Props) {
  return (
      <>
          <Header />

      {children}
      <Footer />
      <ProgressBar
        height="4px"
        color={extendTheme.colors.accent.DEFAULT}
        options={{ showSpinner: false }}
        shallowRouting
      />
      </>
    // <AuthProvider>
    // </AuthProvider>
  )
}

export default memo(MainProviders, isEqual)
