'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { paymentValidateSchema } from '../schema'
import { validatePay } from '@/api/validates'
import { toast } from 'react-toastify'
import { ToastCustom } from '@/components/app'
import { EmailValidate } from './email-validate'
import { emailAccessCode } from '@/api/auth'
import Image from 'next/image'
import { Steps } from './steps'
import { IPaymentValidation } from '@/types'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { APP_URL } from '@/config/urls-data/student.urls.config'
import { useRouter, useSearchParams } from 'next/navigation'

const steps = [
  { title: 'Validar pago' },
  { title: 'Validar email' },
  { title: 'Seleccion de grupos' },
  { title: 'Confirmar matrícula' },
]

export const PaymentValidateForm = ({
  email,
  person_uuid,
}: {
  email: string
  person_uuid: string
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isResendDisabled, setIsResendDisabled] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const router = useRouter()
  const searchParams = useSearchParams()

  const matricula_id = searchParams.get('matricula')
  const student_uuid = searchParams.get('student')

  const [paymentValidate, setPaymentToken] =
    useState<IPaymentValidation | null>(null)

  const form = useForm<z.infer<typeof paymentValidateSchema>>({
    resolver: zodResolver(paymentValidateSchema),
    defaultValues: {
      document_number: '',
      operation_number: '',
      date: '',
    },
  })

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isResendDisabled && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000)
    } else if (timeLeft === 0) {
      setIsResendDisabled(false)
    }
    return () => clearInterval(timer)
  }, [isResendDisabled, timeLeft])

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleRedirectToGroupSelection = () => {
    if (paymentValidate) {
      const url = `${APP_URL.MATRICULA.START_ENROLLMENT.STEP_TWO(
        paymentValidate.uuid
      )}?matricula=${matricula_id}&person_uuid=${person_uuid}&student=${student_uuid}`
      router.push(url)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSendCode = async () => {
    if (!email) return
    const response = await emailAccessCode({
      email,
      action: 'payment-validate',
    })
    if (response.status === 200) {
      setIsResendDisabled(true)
      toast.success(
        <ToastCustom
          title="Código enviado"
          description="El código de acceso ha sido enviado a tu correo electrónico."
        />
      )
      setTimeLeft(30)
    } else {
      toast.error('Error al enviar el código.')
    }
  }

  const handleValidatePayment = async (
    values: z.infer<typeof paymentValidateSchema>
  ) => {
    setLoading(true)
    const res = await validatePay(values)
    if (res.data) {
      setPaymentToken(res.data)
      toast.success(
        <ToastCustom
          title="Pago validado"
          description="El pago ha sido validado correctamente."
        />
      )
      await handleSendCode()
      handleNextStep()
    } else {
      toast.error(
        <ToastCustom
          title="Pago no validado"
          description={`Error al validar el pago: ${res.errors?.join(', ')}`}
        />
      )
    }
    setLoading(false)
  }

  return (
    <>
      <main className="flex flex-col items-center gap-6">
        <div className="max-w-4xl mx-auto p-6 w-full">
          <Steps
            currentStep={currentStep + 1}
            steps={steps}
          />
        </div>
        {currentStep === 0 && (
          <section className="flex flex-col items-center gap-6">
            <main className="w-full">
              <Tabs
                defaultValue="pagalo"
                className="w-full"
              >
                <TabsList className="w-full">
                  <TabsTrigger
                    className="w-full"
                    value="pagalo"
                  >
                    Págalo.pe
                  </TabsTrigger>
                  <TabsTrigger
                    className="w-full"
                    value="ventanilla"
                  >
                    Ventanilla
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="pagalo">
                  <div className="p-2 border rounded-md">
                    <Image
                      src="/images/pagalo.pe.png"
                      alt="Validar pago"
                      width={510}
                      height={300}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="ventanilla">
                  <div className="p-2 border rounded-md">
                    <Image
                      src="/images/recibo_bn.jpg"
                      alt="Validar pago"
                      width={510}
                      height={300}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </main>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleValidatePayment)}
                className="space-y-8 bg-white p-8 border rounded-lg max-w-lg w-full"
              >
                <header className="space-y-2">
                  <h2 className="text-2xl font-bold sm:text-3xl">
                    Validar Pago
                  </h2>
                  <p className="text-sm text-gray-600">
                    La manera más segura para validar tu pago y continuar con el
                    proceso
                  </p>
                </header>
                <FormField
                  control={form.control}
                  name="operation_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código de Pago</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingrese el código de pago"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Fecha de Pago</FormLabel>
                      <Input
                        type="date"
                        {...field}
                        onChange={field.onChange}
                        value={(field.value as unknown as string) || ''}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="document_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DNI</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingrese su DNI"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <footer>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading && (
                      <Loader className="mr-2 h-5 w-5 animate-spin" />
                    )}
                    Validar Pago
                  </Button>
                  <div className="w-full p-3 text-center">
                    <Link
                      href={APP_URL.HOME.URL_BASE}
                      className="text-primary-800 hover:underline w-full text-center text-sm"
                    >
                      Volver al inicio
                    </Link>
                  </div>
                </footer>
              </form>
            </Form>
          </section>
        )}
      </main>

      {currentStep === 1 && (
        <section className="flex flex-col items-center">
          <EmailValidate
            email={email}
            handleSendCode={handleSendCode}
            handleNextStep={handleRedirectToGroupSelection}
            handlePreviousStep={handlePreviousStep}
          />
        </section>
      )}
      {/* {currentStep === 2 && (
        <section className="flex flex-col items-center max-w-4xl">
          <ProgramConfirm
            payment_uuid={paymentValidate?.uuid ?? ''}
            person_uuid={person_uuid}
            promotion_convocatory={promotion_convocatory}
            programData={programData}
          />
        </section>
      )} */}
    </>
  )
}
