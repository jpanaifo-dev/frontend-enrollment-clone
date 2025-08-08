import { z } from 'zod'

export const enrollmentSchemaCreate = z.object({
  student_id: z.string(),
  enrollment_stage_id: z.string(),
  courses: z.array(
    z.object({
      course_group_id: z.string(),
    })
  ),
})

export type IEnrollmentStageCreate = z.infer<typeof enrollmentSchemaCreate>
