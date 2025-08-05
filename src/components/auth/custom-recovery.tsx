'use client'

import { Button } from '@/components/ui/button'
import { AuthLayout } from '@/modules/app'
import { OTPInput, SlotProps } from 'input-otp'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { LoaderIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ForgotPasswordForm } from './auth.interface'

export const ForgotPassword = () => {
  const { control, handleSubmit, watch, formState } =
    useForm<ForgotPasswordForm>()
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isCodeValidated, setIsCodeValidated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isResendDisabled, setIsResendDisabled] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)

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
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsCodeSent(true)
    setIsResendDisabled(true)
    setTimeLeft(30)
    setIsLoading(false)
  }

  const handleValidateCode = async () => {
    if (!code || code.length !== 6) return

    setIsLoading(true)
    const isValid = validateCode(code)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)

    if (isValid) {
      setIsCodeValidated(true)
      toast.success('Código validado correctamente.')
    } else {
      toast.error('Código incorrecto, por favor verifica.')
    }
  }

  const handleChangePassword = async (data: ForgotPasswordForm) => {
    const { newPassword, confirmPassword } = data

    if (newPassword !== confirmPassword) {
      toast.error('Las contraseñas no coinciden.')
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simular cambio de contraseña
    setIsLoading(false)
    toast.success('Contraseña actualizada correctamente.')
  }

  const validateCode = (code: string) => code === '123456'

  return (
    <AuthLayout>
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
            <Button
              type="submit"
              className="w-full bg-[#001B3D]"
              disabled={isLoading}
            >
              {isLoading && <LoaderIcon className="animate-spin mr-2" />}
              Enviar código
            </Button>
          </form>
        </div>
      ) : isCodeValidated ? (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Cambiar contraseña</h2>
          <p className="text-sm text-gray-600">
            Por favor, ingresa tu nueva contraseña.
          </p>
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
                validate: (value) =>
                  value !== watch('confirmPassword') ||
                  'Las contraseñas no coinciden',
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  placeholder="Nueva contraseña"
                />
              )}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{ required: 'Debes confirmar tu contraseña' }}
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
              {/* Botón de Validar Código */}
              <Button
                type="button"
                onClick={handleValidateCode}
                className="w-full bg-[#001B3D]"
                disabled={code?.length !== 6 || isLoading}
              >
                {isLoading && <LoaderIcon className="animate-spin mr-2" />}
                Validar código
              </Button>

              {/* Botón de Reenviar Código */}
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
