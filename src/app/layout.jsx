import { Quicksand } from 'next/font/google'
import './globals.css'
import ClientLayout from './ClientLayout'

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-quicksand',
})

export const viewport = {
  themeColor: '#1a1a2e',
}

export const metadata = {
  title: 'AhumAI — Building the Maritime Software Ecosystem',
  description: 'We are a small team of engineers building software for maritime. Not a capabilities deck. A record of what we have actually built — and an honest account of where we are going.',
  keywords: 'AhumAI, maritime software, compliance automation, crewing, certificate management, NavCert, maritime AI, shipping operations',
  authors: [{ name: 'AhumAI' }],
  robots: 'index, follow',
  metadataBase: new URL('https://ahumai.co.in'),
  openGraph: {
    type: 'website',
    url: 'https://ahumai.co.in/',
    title: 'AhumAI — Building the Maritime Software Ecosystem',
    description: 'We are a small team of engineers building software for maritime. This is a record of what we have actually built.',
    siteName: 'AhumAI',
    images: [{ url: 'https://ahumai.co.in/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    url: 'https://ahumai.co.in/',
    title: 'AhumAI — Building the Maritime Software Ecosystem',
    description: 'We are a small team of engineers building software for maritime. This is a record of what we have actually built.',
    images: ['https://ahumai.co.in/og-image.png'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  alternates: {
    canonical: 'https://ahumai.co.in/',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={quicksand.variable}>
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
