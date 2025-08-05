'use client'

import { Button } from '@/components/ui/button'
import { AuthLayout } from '@/modules/app'
import { OTPInput, SlotProps } from 'input-otp'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { emailAccessCode, verifyAccessCode } from '@/api/auth'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import Link from 'next/link'
import { ToastCustom } from '../app'
import { EmailSignupForm } from './auth.interface'
import { useAuthStore } from './useAuthStore'

export const EmailSignup = () => {
  const { control, handleSubmit, watch, formState } = useForm<EmailSignupForm>()
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isCodeValidated, setIsCodeValidated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isResendDisabled, setIsResendDisabled] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [errorEmailSent, setErrorEmailSent] = useState<string[] | null>(null)

  const router = useRouter()

  const email = watch('email')
  const code = watch('code')
  const { errors } = formState

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isResendDisabled && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000)
    } else if (timeLeft === 0) {
      setIsResendDisabled(false)
    }
    return () => clearInterval(timer)
  }, [isResendDisabled, timeLeft])

  const handleSendCode = async () => {
    if (!email) return

    setIsLoading(true)
    const response = await emailAccessCode({ email, action: 'sign-up' })
    if (response.status !== 200) {
      setErrorEmailSent(response?.errors || ['Error al enviar el código'])
      setIsLoading(false)
      return
    } else {
      setIsCodeSent(true)
      setIsResendDisabled(true)
      toast.success('Código enviado correctamente.')
    }
    // Guarda el email en el estado global
    useAuthStore.getState().setEmail(email)

    setTimeLeft(30)
    setIsLoading(false)
  }

  const handleValidateCode = async () => {
    if (!code || code.length !== 6) return

    setIsLoading(true)
    const response = await verifyAccessCode({
      model: email,
      code,
      action: 'sign-up',
    })
    setIsLoading(false)

    if (response.status === 200) {
      // Simula un código correcto
      setIsCodeValidated(true)
      toast.success('Código validado correctamente.')
    } else {
      toast.error('Código incorrecto, por favor verifica.')
    }
  }

  const handleCompleteSignup = async () => {
    toast.success(
      <ToastCustom
        title="Código validado"
        description="Código validado correctamente. Redirigiendo a la página de registro..."
      />
    )
    setTimeout(() => router.push('/sign-up/register/'), 2000)
  }

  return (
    <AuthLayout>
      {!isCodeSent ? (
        <div className="space-y-6">
          <header>
            <h2 className="text-2xl font-bold">Verificar email</h2>
            <p className="text-sm text-gray-600">
              Ingresa tu correo electrónico para recibir un código de
              verificación.
            </p>
          </header>
          {errorEmailSent && errorEmailSent?.length > 0 && (
            <Alert className="bg-red-50 border border-red-200 text-red-800 dark:bg-red-500 dark:border-red-400 dark:text-red-100">
              <AlertTitle className="text-sm">
                Error al enviar el código
              </AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 text-xs">
                  {errorEmailSent?.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
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
            <Button
              type="submit"
              className="w-full bg-[#001B3D]"
              disabled={isLoading}
            >
              {isLoading ? 'Enviando...' : 'Enviar código'}
            </Button>
            <Button
              variant="ghost"
              asChild
            >
              <Link
                href="/login"
                className="text-blue-600 hover:underline w-full text-center text-sm"
              >
                Ir a inicio de sesión
              </Link>
            </Button>
          </form>
        </div>
      ) : !isCodeValidated ? (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Ingresar código</h2>
          <p className="text-sm text-gray-600">
            Ingresa el código que hemos enviado a tu correo electrónico.
            <span className="block text-sm text-gray-500 font-semibold">
              {email}
            </span>
          </p>

          <Controller
            name="code"
            control={control}
            defaultValue=""
            rules={{
              required: 'El código es requerido',
              minLength: {
                value: 6,
                message: 'El código debe tener 6 dígitos',
              },
            }}
            render={({ field }) => (
              <OTPInput
                {...field}
                id="input-58"
                containerClassName="flex items-center gap-6 has-[:disabled]:opacity-50"
                maxLength={6}
                value={code}
                onChange={field.onChange}
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
          <div className="flex items-center flex-col gap-2 w-full">
            <Button
              onClick={handleValidateCode}
              className="bg-[#001B3D] w-full"
              disabled={isLoading || code?.length !== 6}
            >
              {isLoading ? 'Validando...' : 'Validar código'}
            </Button>
            {isResendDisabled ? (
              <span className="text-gray-500 text-sm">
                {timeLeft}s para reenviar
              </span>
            ) : (
              <Button
                onClick={handleSendCode}
                variant="ghost"
                className="text-blue-600 hover:underline"
              >
                Reenviar código
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">¡Todo listo!</h2>
          <p className="text-sm text-gray-600">
            Tu correo electrónico ha sido verificado correctamente. Haz clic en
            el botón para completar el registro.
          </p>
          <Button
            onClick={handleCompleteSignup}
            className="w-full bg-[#001B3D]"
          >
            Iniciar registro
          </Button>
        </div>
      )}
    </AuthLayout>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        'flex size-16 items-center justify-center rounded-lg border border-input bg-background font-medium text-foreground shadow-sm shadow-black/5 transition-shadow',
        { 'z-10 border border-ring ring-[3px] ring-ring/20': props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  )
}
