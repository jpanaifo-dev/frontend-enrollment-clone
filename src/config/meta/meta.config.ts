import { Metadata } from 'next'

export const CONFIG_META = {
  title: {
    template: '%s | UNAP',
    default: 'UNAP',
  },
  description: 'Sistema de Admisión UNAP',
  openGraph: {
    title: 'Sistema de Admisión UNAP',
    description: 'Sistema de Admisión UNAP',
    url: process.env.NEXT_PUBLIC_URL,
    siteName: 'Sistema de Admisión UNAP',
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
    title: 'Sistema de Admisión UNAP',
    description: 'Sistema de Admisión UNAP',
    images: [`${process.env.NEXT_PUBLIC_URL}/images/logo.png`],
  },
} as Metadata

// export const CONFIG_META_PAGES = {
//     STUDENT_BASE: {
//       title: {
