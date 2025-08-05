import { z } from 'zod'

export const formSchemaChangePassword = z
  .object({
    user_token: z.string(),
    password: z.string().min(1, 'La contraseña actual es obligatoria'),
    newpassword: z
      .string()
      .min(8, 'Debe tener al menos 8 caracteres')
      .regex(/[0-9]/, 'Debe contener al menos 1 número')
      .regex(/[a-z]/, 'Debe contener al menos 1 letra minúscula')
      .regex(/[A-Z]/, 'Debe contener al menos 1 letra mayúscula'),
    confirm_password: z.string(),
  })
  .refine((data) => data.newpassword === data.confirm_password, {
    message: 'Las contraseñas no coinciden',
    path: ['confirm_password'],
  })

export type ChangePasswordFormValues = z.infer<typeof formSchemaChangePassword>
