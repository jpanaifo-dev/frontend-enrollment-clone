import { z } from 'zod'

export const PersonJobSchema = z.object({
  company_name: z.string(),
  occupation: z.string(),
  area: z.string(),
  start_date: z.string(),
  end_date: z.string().nullable().optional(),
  job_sector: z.number(),
  person_token: z.any().nullable(),
  job_modality: z.string(),
  country_uuid: z.string().nullable(),
})

export type PersonJobType = z.infer<typeof PersonJobSchema>
