interface Schedule {
  id: number
  day: string
  room_id: number
  room_name: string
  start_time: string
  end_time: string
}

export interface EnrollmentGroup {
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

interface Course {
  id: number
  uuid: string
  name: string
  code: string
  academic_cycle: string
  credits: string
}

interface CourseGroup {
  course_uuid: string
  course: Course
  groups: EnrollmentGroup[]
}

export type CoursesData = CourseGroup[]
