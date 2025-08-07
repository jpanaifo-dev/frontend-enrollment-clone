'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AUTH_URLS_APP } from '@/config/urls-data/auth.urls.config'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon, Loader } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { LoginFormValues, LoginProps, loginSchema } from './auth.interface'
import Image from 'next/image'
import { AuthLayout } from '@/modules/app'
import { fetchLogin } from '@/api/auth'
import { ToastCustom } from '../app'
import { toast } from 'react-toastify'
import { useRouter, useSearchParams } from 'next/navigation'
import { APP_URL } from '@/config/urls-data/student.urls.config'

export const Login = (props: LoginProps) => {
  const { subTitle, path } = props
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorsList, setErrorsList] = useState<Array<string>>([])

  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect') || null

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true)
    setErrorsList([])

    const response = await fetchLogin(data, path)
    if (response.status === 200 && response.data) {
      toast.success(
        <ToastCustom
          title="Inicio de sesión exitoso"
          description={`Bienvenido, ${response?.data?.first_name} ${response?.data?.last_name}.`}
        />
      )
      if (path === 'student') {
        router.push(redirectUrl || APP_URL.HOME.URL_BASE)
      } else {
        router.push(redirectUrl || APP_URL.HOME.URL_BASE)
      }
    } else {
      setErrorsList(response.errors || ['Error desconocido.'])
    }

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }
  const subTitleText =
    'Ingresa tus credenciales para continuar al panel de administración. Si eres alumno, utiliza tu usuario y contraseña asignados para acceder al sistema de matrícula.'

  return (
    <AuthLayout
      gradientOpacity={0.5}
      backgroundImage="/images/bg-matricula.webp"
      subTitle={subTitleText}
    >
      <div className="text-center lg:text-left">
        <div className="flex items-center justify-center mb-4 md:hidden">
          <Image
            src="/brands/escudo-epg.webp?height=40&width=40"
            alt="EPG-UNAP Logo"
            width={35}
            height={35}
            className="object-contain w-9 h-9 min-w-9 min-h-9 max-w-9 max-h-9"
          />
        </div>
        <h2 className="text-2xl font-bold mb-2">Bienvenido de vuelta</h2>
        {subTitle ? (
          <p className="text-sm text-muted-foreground">{subTitle}</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            No tienes una cuenta?{' '}
            <Link
              href={'#'}
              className="text-blue-600 hover:underline"
            >
              Crear cuenta
            </Link>
          </p>
        )}
      </div>
      {errorsList?.length > 0 && (
        <section className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded relative dark:bg-red-500 dark:border-red-400 dark:text-red-100">
          <ul className="flex flex-col gap-1">
            {errorsList?.map((error, index) => (
              <li
                key={index}
                className="text-red-500 text-sm list-disc list-inside"
              >
                {error}
              </li>
            ))}
          </ul>
        </section>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="space-y-4">
          {/* Campo de email */}
          <div>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Usuario"
                  className="w-full"
                />
              )}
            />
            {errors?.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors?.username?.message}
              </p>
            )}
          </div>

          {/* Campo de contraseña */}
          <div className="relative">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Contraseña"
                  className="w-full pr-10"
                />
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
            {errors?.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors?.password?.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Link
            href={AUTH_URLS_APP.FORGOT_PASSWORD.URL_BASE}
            className="text-sm text-blue-600 hover:underline"
          >
            Recuperar contraseña
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#001529] hover:bg-[#002140]"
          disabled={loading}
        >
          {loading && <Loader className="w-6 h-6 mr-2 animate-spin" />}
          Iniciar sesión
        </Button>
        {/* <div className="flex items-center justify-center gap-2">
          <hr className="flex-grow" />
          <span>o</span>
          <hr className="flex-grow" />
        </div> */}
        {/* <SessionProvider>
          <LoginAuth path={path} />
        </SessionProvider> */}
        <Button
          type="button"
          onClick={() => router.push(APP_URL.HOME.LANDING)}
          variant="link"
        >
          Regresar al inicio
        </Button>
      </form>
    </AuthLayout>
  )
}
