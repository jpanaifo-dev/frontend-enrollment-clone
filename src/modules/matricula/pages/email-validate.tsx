'use client'

import { Button } from '@/components/ui/button'
import { OTPInput, SlotProps } from 'input-otp'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { cn } from '@/lib/utils'
import { verifyAccessCode } from '@/api/auth'
import { ArrowLeft } from 'lucide-react'
import { ToastCustom } from '@/components/app'
interface OTPForm {
  code: string
}

interface EmailValidateProps {
  email: string
  handleSendCode: () => void
  handlePreviousStep: () => void
  handleNextStep: () => void
}

export const EmailValidate = (props: EmailValidateProps) => {
  const { email, handleSendCode, handlePreviousStep, handleNextStep } = props
  const { control, watch } = useForm<OTPForm>()
  const [isCodeValidated, setIsCodeValidated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isResendDisabled, setIsResendDisabled] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)

  const code = watch('code')
  // const router = useRouter()
  // const pathname = usePathname()
  // const newPath = pathname.split('/').slice(0, -1).join('/')

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isResendDisabled && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000)
    } else if (timeLeft === 0) {
      setIsResendDisabled(false)
    }
    return () => clearInterval(timer)
  }, [isResendDisabled, timeLeft])

  const handleValidateCode = async () => {
    if (!code || code.length !== 6) return
    setIsLoading(true)

    const response = await verifyAccessCode({
      model: email,
      code,
      action: 'payment-validate',
    })
    setIsLoading(false)
    if (response.status === 200) {
      toast.success(
        <ToastCustom
          title="Código validado"
          description={`${email} ${response?.data?.message}`}
        />
      )
      setIsCodeValidated(true)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      handleNextStep()
    } else {
      toast.error(
        <ToastCustom
          title="Error"
          description={`Error al validar el código: ${response?.errors?.join(
            ', '
          )}`}
        />
      )
    }
  }

  return (
    <section className="border-2 border-gray-300 px-3 py-8 sm:p-8 rounded-lg w-full max-w-lg bg-white">
      {!isCodeValidated ? (
        <div className="space-y-6">
          <header className="space-y-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handlePreviousStep}
            >
              <ArrowLeft size={16} />
              Validar otro pago
            </Button>
            <h2 className="text-2xl font-bold sm:text-3xl">Ingresar código</h2>
            <p className="text-sm text-gray-600">
              Ingresa el código que hemos enviado al correo{' '}
              <strong>{email}</strong>.
            </p>
          </header>

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
                id="input-otp"
                containerClassName="flex items-center gap-6"
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
                type="button"
                onClick={() => handleSendCode()}
                variant="ghost"
                className="text-blue-600 hover:underline w-full"
              >
                Reenviar código
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6 w-full max-w-lg">
          <section className="w-full p-4 flex flex-col items-center gap-4">
            <h2 className="text-3xl lg:text-4xl font-bold">
              ¡Código validado!
            </h2>
            <p className="text-sm text-gray-600">
              El código se ha validado correctamente. Estamos preparando tu
              acceso a la siguiente etapa. Por favor, espera un momento.
            </p>
          </section>
        </div>
      )}
    </section>
  )
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
