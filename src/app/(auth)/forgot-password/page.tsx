import React from 'react'
import { ForgotPassword } from '@/components/auth'
import { Metadata } from 'next'
import { AUTH_METADATA } from '@/config/meta'
export const metadata: Metadata = AUTH_METADATA.PAGES.FORGOT_PASSWORD

export default function Page() {
  return <ForgotPassword />
}
