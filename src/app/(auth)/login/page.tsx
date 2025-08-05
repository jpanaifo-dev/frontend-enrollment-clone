import { Login } from '@/components/auth'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { AUTH_METADATA } from '@/config/meta'
import { getUserAuth } from '@/lib/session'
import { IUserAuth } from '@/types'
import { STUDENT_URLS_APP } from '@/config/urls-data/student.urls.config'

export const metadata: Metadata = AUTH_METADATA.PAGES.LOGIN

export default async function Page() {
  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  if (data) {
    redirect(STUDENT_URLS_APP.HOME.URL_BASE)
  }

  return (
    <Login
      path="student"
      subTitle="Ingresa tus credenciales para iniciar sesión como alumno."
    />
  )
}

export const dynamic = 'force-dynamic'
