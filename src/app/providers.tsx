// app/providers.tsx
'use client'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
// import { NetworkStatusAlert } from '@/components/app/miscellaneous'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer position="top-right" />
      {/* <NetworkStatusAlert /> */}
    </>
  )
}
