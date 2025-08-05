import { z } from 'zod'

export const paymentValidateSchema = z.object({
  operation_number: z.string().min(6, {
    message: 'El código de pago debe tener al menos 6 caracteres.'
  }),
  date: z.string({
    required_error: 'La fecha de pago es requerida.'
  }),
  document_number: z.string().regex(/^\d{8}$/, {
    message: 'El DNI debe tener 8 dígitos numéricos.'
  })
})

export type PaymentValidateFormValues = z.infer<typeof paymentValidateSchema>
