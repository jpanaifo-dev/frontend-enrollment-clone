import { z } from 'zod'

export const AcademicInfoSchema = z.object({
  institution: z
    .string({ message: 'El nombre de la institución es requerido' })
    .nonempty('El nombre de la institución es requerido'),
  is_degree: z.boolean(),
  file: z.any().nullable(),
  person_token: z.any().nullable(),
  academic_degree: z.number().nullable(),
  start_date: z.string().nonempty('El periodo de estudio es requerido'),
  end_date: z.string().nullable(),
  diploma_date: z.string().nullable().optional(),
  faculty: z.string().nullable(),
  program_career: z.string().nullable(),
  denomination: z.string().nullable(),
})

export const AcademicLanguageSchema = z.object({
  language: z.string().nonempty('El nombre del idioma es requerido'),
  level: z.number(),
  person_token: z.any().nullable(),
  institution: z.string().nonempty('El nombre de la institución es requerido'),
  file: z.any().nullable(),
})

export type AcademicInfoType = z.infer<typeof AcademicInfoSchema>
export type AcademicLanguageType = z.infer<typeof AcademicLanguageSchema>
