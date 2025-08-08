import { z } from 'zod'

export const enrollmentSchemaCreate = z.object({
  student_file_uuid: z.string().uuid(),
  // period_uuid: z.string().uuid(),
  // payment_uuid: z.string().uuid(),
  enrollment_stage_id: z.string(),
  courses: z.array(
    z.object({
      course_group_id: z.string(),
    })
  ),
})

export type IEnrollmentStageCreate = z.infer<typeof enrollmentSchemaCreate>
