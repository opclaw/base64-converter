import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://base64-converter.vercel.app'),
  alternates: {
    canonical: 'https://base64-converter.vercel.app',
  },
  title: 'Base64 Converter — Encode & Decode | Free Online Tool',
  description: 'Convert text to Base64 and decode Base64 to text. Free online Base64 encoder and decoder for developers.',
  keywords: ['base64 converter', 'base64 encoder', 'base64 decoder', 'base64 encode', 'base64 decode'],
  authors: [{ name: 'SmartOK Tools' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://base64-converter.vercel.app',
    siteName: 'Base64 Converter',
    title: 'Base64 Converter — Encode & Decode',
    description: 'Convert text to Base64 and decode Base64 to text.',
    images: ['/og-image.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base64 Converter',
    description: 'Convert text to Base64 and decode Base64 to text.',
    images: ['/og-image.svg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Base64 Converter',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Any',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              featureList: 'Base64 encoding, Base64 decoding, File support, URL-safe Base64',
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  )
}
