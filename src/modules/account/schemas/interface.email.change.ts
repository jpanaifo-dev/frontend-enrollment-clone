import { z } from 'zod'

export const formSchemaEmailChange = z.object({
  user_token: z.string(),
  email: z.string().email('Debe ser un correo electrónico válido'),
})

export type EmailChangeFormValues = z.infer<typeof formSchemaEmailChange>
