export interface IEnrollmentStage {
  id: number
  description: string
  start_date: string
  end_date: string
  is_active: boolean
  program_id: number
  program_code: string
  program_name: string
  period_name: string
  student_id: number
  enrollment: boolean
  enrollment_id?: number | null
}

export interface IStudentProgram {
  id: number
  program_code: string
  program_name: string
  program_description: string
  is_active: boolean
  program_background?: string
}

export interface IStudentDetails {
  id: number
  university_code: string
  plan_study_description: string
  program_code: string
  program_name: string
  unity_name: string
  person_name: string
  modality_name: string
}

export interface IEnrollmentList {
  id: number
  fecha: string
  period_name: string
  enrollment_type: string
  program: string
  courses: number
  credits: number
}
