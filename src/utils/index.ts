import { Metadata } from 'next'
import { cn } from '@/utils/cn';

export { cn };

export function isSSR() {
  return typeof window === 'undefined'
}

export function constructMetadata({
  title = 'Cyndi Kaszirer - Luxury Florida Real Estate | REALTOR®',
  description = 'Cyndi Kaszirer, your trusted Florida REALTOR®. Specializing in luxury homes, waterfront properties, và exclusive communities across Florida. Expert guidance for buying and selling premium real estate.',
  image = '/og-image.png',
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    authors: [{ name: 'Cyndi Kaszirer' }],
    openGraph: {
      title,
      description: 'Cyndi Kaszirer, your trusted Florida REALTOR®. Specializing in luxury homes, waterfront properties, and exclusive communities across Florida.',
      type: 'website',
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: 'Cyndi Kaszirer, your trusted Florida REALTOR®. Specializing in luxury homes, waterfront properties, and exclusive communities.',
      images: [image],
    },
    icons: [
      { rel: 'icon', url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'shortcut icon', url: '/favicon.ico' },
      { rel: 'apple-touch-icon', url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    manifest: '/site.webmanifest',
    metadataBase: new URL('https://cyndisellsflorida.com/'),
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
      title: 'CyndiSellsFlorida',
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
