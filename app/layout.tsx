import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://base64converter.tools'),
  title: 'Base64 Encoder & Decoder — Free Online Tool',
  description: 'Encode and decode Base64 strings and files online. Free Base64 converter tool with file support. No registration, 100% private.',
  keywords: ['base64 encode', 'base64 decode', 'base64 converter', 'online base64', 'file to base64'],
  openGraph: {
    title: 'Base64 Encoder & Decoder',
    description: 'Encode and decode Base64 strings and files online.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script id="schema" type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Base64 Converter',
              applicationCategory: 'DeveloperApplication',
              offers: { price: '0', priceCurrency: 'USD' },
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}