'use client'

import { Button } from '@/components/ui/button'
import { AuthLayout } from '@/modules/app'
import { OTPInput } from 'input-otp'
import { useEffect, useState } from 'react'
import { LoaderIcon, X } from 'lucide-react'
import { Input } from '../ui/input'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { emailAccessCode, verifyAccessCode, recoveryPassword } from '@/api/auth'
import { ToastCustom } from '../app'
import { AUTH_URLS_APP } from '@/config/urls-data/auth.urls.config'
import { ForgotPasswordForm, ResponsePasswordRecovery } from './auth.interface'
import { Slot } from './slot-component'
import { InputPassword } from './input-password'

export const ForgotPassword = () => {
  const { control, handleSubmit, watch, formState } =
    useForm<ForgotPasswordForm>()
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isCodeValidated, setIsCodeValidated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isResendDisabled, setIsResendDisabled] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [codePassword, setCodePassword] = useState('')

  const [erros, setErrors] = useState<string[]>([])

  const router = useRouter()

  const email = watch('email')
  const code = watch('code')

  const { errors } = formState

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isResendDisabled && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsResendDisabled(false)
    }
    return () => clearInterval(timer)
  }, [isResendDisabled, timeLeft])

  const handleSendCode = async () => {
    if (!email) return

    setIsLoading(true)
    const response = await emailAccessCode({ email, action: 'forgot-password' })

    if (response.status !== 200) {
      toast.error(
        <ToastCustom
          title="Error al enviar el código"
          description={`${response?.errors?.join(', ')}`}
        />
      )
      setIsLoading(false)
      return
    } else {
      setIsCodeSent(true)
      setIsResendDisabled(true)
      setTimeLeft(30)
      setIsLoading(false)
      toast.success(
        <ToastCustom
          title="¡Éxito!"
          description={`${response?.data?.message}`}
        />
      )
    }
  }

  const handleValidateCode = async () => {
    if (!code || code.length !== 6) return

    setIsLoading(true)
    const response = await verifyAccessCode({
      model: email,
      code,
      action: 'forgot-password',
    })
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)

    if (response.status === 200) {
      const dataResponse: ResponsePasswordRecovery =
        response.data as ResponsePasswordRecovery

      setCodePassword(dataResponse.data.code_token)
      setIsCodeValidated(true)
      toast.success(
        <ToastCustom
          title="¡Éxito!"
          description={`${dataResponse?.message}. Ahora puedes cambiar tu contraseña.`}
        />
      )
    } else {
      toast.error(
        <ToastCustom
          title="Error"
          description={`${response?.errors?.join(', ')}`}
        />
      )
    }
  }

  const handleChangePassword = async (data: ForgotPasswordForm) => {
    const { newPassword, confirmPassword } = data

    if (newPassword !== confirmPassword) {
      toast.error(
        <ToastCustom
          title="Error"
          description="Las contraseñas no coinciden."
        />
      )
      return
    }

    setIsLoading(true)

    const response = await recoveryPassword({
      email,
      password: newPassword,
      confirm_password: confirmPassword,
      code_token: codePassword,
    })

    if (response?.status === 200) {
      toast.success(
        <ToastCustom
          title="¡Éxito!"
          description="Contraseña cambiada correctamente. Serás redirigido al inicio de sesión en unos segundos."
        />
      )
      setTimeout(() => router.push(AUTH_URLS_APP.LOGIN.URL_BASE), 2000)
    } else {
      setErrors(response?.errors || [])
    }

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <AuthLayout
      gradientOpacity={0.5}
      backgroundImage="/images/bg-matricula.webp"
    >
      {!isCodeSent ? (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Recuperar contraseña</h2>
          <p className="text-sm text-gray-600">
            Por favor, ingresa tu correo electrónico para recibir un código de
            verificación.
          </p>
          <form
            onSubmit={handleSubmit(handleSendCode)}
            className="space-y-4"
          >
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: 'El correo electrónico es requerido',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'El correo electrónico no es válido',
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  placeholder="Correo electrónico"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
            <footer className="w-full text-center flex flex-col gap-2">
              <Button
                type="submit"
                className="w-full bg-[#001B3D]"
                disabled={isLoading}
              >
                {isLoading && <LoaderIcon className="animate-spin mr-2" />}
                Enviar código
              </Button>
              <Button
                type="button"
                onClick={() => router.push(AUTH_URLS_APP.LOGIN.URL_BASE)}
                variant="link"
              >
                Regresar al inicio de sesión
              </Button>
            </footer>
          </form>
        </div>
      ) : isCodeValidated ? (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Cambiar contraseña</h2>
          <p className="text-sm text-gray-600">
            Por favor, ingresa tu nueva contraseña.
          </p>
          {erros.length > 0 && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <button
                onClick={() => setErrors([])} // Asegúrate de tener un estado para errores y una función `setErrors`
                className="absolute top-0 right-0 mt-1 mr-2 text-red-500 hover:text-red-700 focus:outline-none"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
              <ul className="list-disc list-inside">
                {erros.map((error, index) => (
                  <li
                    key={index}
                    className="text-red-500 text-sm mt-1"
                  >
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <form
            onSubmit={handleSubmit(handleChangePassword)}
            className="space-y-4"
          >
            <Controller
              name="newPassword"
              control={control}
              defaultValue=""
              rules={{
                required: 'La nueva contraseña es requerida',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },
              }}
              render={({ field }) => <InputPassword {...field} />}
            />
            {errors?.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors?.newPassword?.message}
              </p>
            )}
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: 'Debes confirmar tu contraseña',
                validate: (value) =>
                  value === watch('newPassword') ||
                  'Las contraseñas no coinciden',
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  placeholder="Confirmar contraseña"
                />
              )}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
            <Button
              type="submit"
              className="w-full bg-[#001B3D]"
              disabled={isLoading}
            >
              {isLoading && <LoaderIcon className="animate-spin mr-2" />}
              Cambiar contraseña
            </Button>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Validar código</h2>
          <p className="text-sm text-gray-600">
            Hemos enviado un código de verificación al correo electrónico{' '}
            <span className="font-semibold">{email}</span>. Por favor, ingrésalo
            a continuación.
          </p>
          <form
            onSubmit={handleSubmit(handleValidateCode)}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Controller
                name="code"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <OTPInput
                    id="reset-input"
                    containerClassName="flex items-center gap-6"
                    maxLength={6}
                    {...field}
                    render={({ slots }) => (
                      <div className="flex gap-3">
                        {slots.map((slot, idx) => (
                          <Slot
                            key={idx}
                            {...slot}
                          />
                        ))}
                      </div>
                    )}
                  />
                )}
              />
            </div>
            <footer className="w-full text-center flex flex-col gap-2">
              <Button
                type="button"
                onClick={handleValidateCode}
                className="w-full bg-[#001B3D]"
                disabled={code?.length !== 6 || isLoading}
              >
                {isLoading && <LoaderIcon className="animate-spin mr-2" />}
                Validar código
              </Button>

              <Button
                type="button"
                onClick={handleSendCode}
                variant="link"
                disabled={isResendDisabled || isLoading}
              >
                {isLoading && <LoaderIcon className="animate-spin mr-2" />}
                {isResendDisabled
                  ? `Reenviar código en ${timeLeft}s`
                  : 'Reenviar código'}
              </Button>
            </footer>
          </form>
        </div>
      )}
    </AuthLayout>
  );
}
