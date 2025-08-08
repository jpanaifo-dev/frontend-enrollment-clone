import { Metadata } from 'next'

export const CONFIG_META = {
  title: {
    template: '%s | IMS',
    default: 'IMS',
  },
  description: 'Sistema de Admisión IMS',
  openGraph: {
    title: 'Sistema de Admisión IMS',
    description: 'Sistema de Admisión IMS',
    url: process.env.NEXT_PUBLIC_URL,
    siteName: 'Sistema de Admisión IMS',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL}/images/logo.png`,
        width: 800,
        height: 600,
      },
    ],
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sistema de Admisión IMS',
    description: 'Sistema de Admisión IMS',
    images: [`${process.env.NEXT_PUBLIC_URL}/images/logo.png`],
  },
} as Metadata
