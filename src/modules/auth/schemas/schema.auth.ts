import { z } from 'zod'
import { checkStrength } from '@/modules/auth'

const passwordStrengthSchema = z
  .string()
  .min(8)
  .max(32)
  .refine(
    (value) => {
      const strength = checkStrength(value)
      return strength.filter((req) => req.met).length >= 4
    },
    {
      message: 'La contraseña no cumple con los requisitos de seguridad.',
    }
  )

export const registerSchema = z
  .object({
    documentType: z.number().min(1, 'Selecciona un tipo de documento'),
    documentNumber: z
      .string()
      .min(1, 'El número de documento es requerido')
      .regex(/^\d+$/, 'El número de documento solo puede contener números'),
    nombres: z.string().min(1, 'Los nombres son requeridos'),
    primerApellido: z.string().min(1, 'El primer apellido es requerido'),
    // segundoApellido: z.string().min(1, 'El segundo apellido es requerido'),
    segundoApellido: z.string().optional(),
    password: passwordStrengthSchema,
    confirmPassword: z.string().min(1, 'Confirma tu contraseña'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export type RegisterFormValues = z.infer<typeof registerSchema>
