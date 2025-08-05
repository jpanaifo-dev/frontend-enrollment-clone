export interface IEnrollmentStage {
  id: number
  description: string
  start_date: string
  end_date: string
  untimely_start_date: string
  untimely_end_date: string
  is_active: boolean
  program_type: string
  program_uuid: string
  program_code: string
  program_name: string
  study_plan_uuid: string
  study_plan_description: string
  period_uuid: string
  period_name: string
  student_uuid: string
  enrollment: boolean
  enrollment_id?: number | null
}

export interface IStudentProgram {
  id: number
  uuid: string
  program_code: string
  program_name: string
  program_type: string
  unity_name: string
  modality_name: string
  state: string
  program_credits: number
  student_file_credits: number
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
