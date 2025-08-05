'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import type { IUserAuth } from '@/types'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EyeIcon, EyeOffIcon, Loader } from 'lucide-react'
import { fetchLogin } from '@/api/auth'
import { toast } from 'react-toastify'
import { ToastCustom } from '@/components/app'
import { LoginFormValues, loginSchema } from '@/components/auth/auth.interface'
import { AUTH_URLS_APP } from '@/config/urls-data'
import Link from 'next/link'

interface AuthDialogProps {
  userAuth?: IUserAuth | null
  classNameButtonLogin?: string
  variant?: 'nav' | 'default'
}

export const AuthDialog = ({
  userAuth,
  classNameButtonLogin,
  variant = 'default',
}: AuthDialogProps) => {
  const [open, setOpen] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorsList, setErrorsList] = useState<Array<string>>([])

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

    const response = await fetchLogin(data, 'student')
    if (response.status === 200 && response.data) {
      toast.success(
        <ToastCustom
          title="Inicio de sesión exitoso"
          description={`Bienvenido, ${response?.data?.first_name} ${response?.data?.last_name}.`}
        />
      )
      window.location.reload()
    } else {
      setErrorsList(response.errors || ['Error desconocido.'])
    }

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <>
      {!userAuth && (
        <>
          {variant === 'default' && (
            <>
              <Button
                className={cn(
                  'w-full bg-gradient-to-r from-gray-300 to-gray-400',
                  'hover:from-gray-200 hover:to-gray-300',
                  'text-white font-medium py-6 shadow-lg',
                  'border border-white/10',
                  classNameButtonLogin
                )}
                onClick={() => setOpen(true)}
              >
                <span className="relative z-10 text-gray-900">
                  Iniciar sesión para comenzar
                </span>
                <div className="absolute inset-0 -translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-gray-200 to-gray-300 transition-transform duration-300" />
              </Button>

              <div className="text-center text-sm text-muted-foreground mt-3">
                <span>¿Aún no tienes cuenta? </span>
                {/* <Button
                  variant="link"
                  className="p-0 h-auto text-primary"
                  asChild
                >
                  <Link href={ADMISSION_URLS_APP.AUTH.REGISTER}>
                    Registrarme
                  </Link>
                </Button> */}
              </div>
            </>
          )}
          {variant === 'nav' && (
            <div className="hidden md:grid grid-cols-2 items-center space-x-2 w-fit justify-end">
              <Link
                href={AUTH_URLS_APP.LOGIN.URL_BASE}
                className="text-sm text-gray-100 hover:text-gray-300 w-full inline-block"
              >
                {`Iniciar sesión`}
              </Link>
              {/* <Button
                className=" bg-studio-gold hover:bg-studio-gold-dark text-white font-bold py-2 px-8 rounded w-full"
                asChild
              >
                <Link href={ADMISSION_URLS_APP.HOME.REGISTER}>Registrarme</Link>
              </Button> */}
            </div>
          )}

          <Dialog
            open={open}
            onOpenChange={setOpen}
          >
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Iniciar sesión</DialogTitle>
                <DialogDescription>
                  Inicia sesión para comenzar el proceso de matrícula.
                </DialogDescription>
              </DialogHeader>
              {errorsList?.length > 0 && (
                <section className="bg-danger-50 border border-danger-200 text-danger-800 px-4 py-3 rounded relative dark:bg-danger-500 dark:border-danger-400 dark:text-danger-100">
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
                className="flex flex-col gap-6 pt-4"
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
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading && <Loader className="w-6 h-6 mr-2 animate-spin" />}
                  Iniciar sesión
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  )
}
