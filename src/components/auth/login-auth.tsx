/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { signIn, useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { signInWithGoogle } from '@/api/auth'
import { IUserGoogle } from '@/types'
import { ToastCustom } from '../app'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Loader } from 'lucide-react'
import { STUDENT_URLS_APP } from '@/config/urls-data/student.urls.config'

interface LoginAuthProps {
  path: 'student' | 'teacher'
}

export function LoginAuth({ path }: LoginAuthProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const isLoginWithGoogle =
    typeof window !== 'undefined' &&
    localStorage.getItem('loginMethod') === 'google'

  const handleGoogleSignIn = async () => {
    setLoading(true)
    if (typeof window !== 'undefined') {
      localStorage.setItem('loginMethod', 'google')
    }

    await signIn('google', {
      redirect: false,
      callbackUrl:
        path === 'student'
          ? STUDENT_URLS_APP.HOME.URL_BASE
          : STUDENT_URLS_APP.HOME.URL_BASE,
    })
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
  }

  const fetchSession = useCallback(async () => {
    if (session?.user?.email) {
      const dataSession: IUserGoogle = session?.user as unknown as IUserGoogle
      const response = await signInWithGoogle(dataSession.idToken, path)

      if (response.status === 200 && response.data) {
        toast.success(
          <ToastCustom
            title="Inicio de sesión exitoso"
            description={`Bienvenido, ${response.data.first_name} ${response.data.last_name}.`}
          />
        )
        router.push(
          path === 'student'
            ? STUDENT_URLS_APP.HOME.URL_BASE
            : STUDENT_URLS_APP.HOME.URL_BASE
        )
      }
    }
  }, [session, path, router])

  useEffect(() => {
    if (isLoginWithGoogle) {
      fetchSession()
    }
  }, [session])

  return (
    <div className="flex flex-col items-center w-full">
      <Button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
        disabled={loading}
        variant="ghost"
      >
        {loading ? (
          <Loader className="w-6 h-6 animate-spin" />
        ) : (
          <img
            src="/svg/google.svg"
            alt="google-logo"
            className="w-6 h-6 mr-2"
          />
        )}
        Iniciar sesión con Google
      </Button>
    </div>
  )
}
