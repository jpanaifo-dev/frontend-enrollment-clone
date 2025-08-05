import { z } from 'zod'

// const ACCEPTED_IMAGE_TYPES = [
//   'image/jpeg',
//   'image/jpg',
//   'image/png',
//   'image/webp',
// ]

export const filePersonSchema = z.object({
  file: z.instanceof(File).refine((file) => file.type === 'application/pdf', {
    message: 'Only PDF files are allowed.'
  }),
  file_Type: z.number().nullable(),
  is_active: z.boolean(),
  requirement: z.number().nullable(),
  person_token: z.string().nullable()
})

export type FilePesonSchemaType = z.infer<typeof filePersonSchema>

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export const fileManagerSchema = (acceptedImageTypes: string[]) =>
  z.object({
    id: z.number(),
    uuid: z.string(),
    person_uuid: z.string(),
    application_uuid: z.string().nullable(),
    service: z.string().nullable(),
    file: z
      .array(z.instanceof(File))
      .refine(
        (files) =>
          files.every((file) => acceptedImageTypes.includes(file.type)),
        { message: 'El archivo debe ser  uno de los formatos esperados' }
      )
      .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE), {
        message: 'El archivo debe ser menor a 5MB'
      }),
    is_active: z.boolean(),
    is_valid: z.boolean(),
    expiration_date: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
    requirement: z.number(),
    file_Type: z.number()
  })

export type FileSchemaType = z.infer<ReturnType<typeof fileManagerSchema>>

export const fileListSchema = (acceptedImageTypes: string[]) =>
  z.object({
    id: z.number().optional(),
    uuid: z.string().optional(),
    person_uuid: z.string(),
    application_uuid: z.string().nullable().optional(),
    service: z.string().nullable().optional(),
    file: z
      .instanceof(File)
      .refine((file) => acceptedImageTypes.includes(file.type), {
        message: 'El archivo debe ser uno de los formatos esperados'
      })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: 'El archivo debe ser menor a 5MB'
      }),
    is_active: z.boolean(),
    is_valid: z.boolean().optional(),
    expiration_date: z.string().nullable().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    requirement: z.number(),
    file_Type: z.number()
  })

export type FileListSchemaType = z.infer<ReturnType<typeof fileListSchema>>
