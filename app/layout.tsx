import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://base64converter.vercel.app'),
  title: 'Base64 Encoder & Decoder — Free Online Tool',
  description: 'Encode and decode Base64 strings and files online. Free Base64 converter for text, images, and binary data.',
  keywords: ['base64 encode', 'base64 decode', 'base64 converter', 'online base64', 'base64 decoder', 'base64 encoder'],
  authors: [{ name: 'Base64 Converter' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://base64converter.vercel.app',
    siteName: 'Base64 Converter',
    title: 'Base64 Encoder & Decoder — Free Online Tool',
    description: 'Encode and decode Base64 strings and files online.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base64 Encoder & Decoder',
    description: 'Encode and decode Base64 strings and files online.',
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
              featureList: 'Base64 encoding, Base64 decoding, File encoding, Text encoding, Image to Base64',
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}