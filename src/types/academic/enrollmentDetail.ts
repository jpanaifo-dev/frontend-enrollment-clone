export interface StudentDetails {
  id: number
  university_code: string
  names: string
  last_name1: string
  last_name2: string
  document_number: string
}

export interface Schedule {
  id: number
  day: string
  room_id: number
  room_name: string
  start_time: string
  end_time: string
}

export interface Group {
  id: number
  group: string
  max_students: number
  students_enrolled: number
  start_date: string
  end_date: string
  is_active: boolean
  teacher: string
  schedule: Schedule[]
}

export interface Course {
  uuid: string
  name: string
  code: string
  academic_cycle: string
  credits: string
}

interface CourseWithGroups {
  course_uuid: string
  course: Course
  groups: Group[]
}

interface ProgramDetails {
  plan_study_description: string
  program_code: string
  program_name: string
  unity_name: string
  modality_name: string
  headquarter_name: string
}

interface EnrollmentDetails {
  id: number
  fecha: string
  period_name: string
  enrollment_type: string
}
export interface StudentData {
  student_details: StudentDetails
  program_details: ProgramDetails
  enrollment_details: EnrollmentDetails
  courses: CourseWithGroups[]
}
