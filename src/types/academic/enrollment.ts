import { IPerson } from '../person'

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
  code: string
  is_active: boolean
  person: IPerson | null
  program: {
    id: number
    name: string
    code: string
    description: string
    background: string
    is_active: boolean
  } | null
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

export interface IStudentFilters {
  id?: number
  person?: string
  program?: string
  is_active?: boolean | string
  person__document_number?: string
  person__document_number__icontains?: string
}
