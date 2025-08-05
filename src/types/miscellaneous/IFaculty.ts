export interface IFaculty {
  id: number
  uuid: string
  name: string
  type: string
  email: string
  phone: string
  abbreviation: string
  is_faculty: boolean
  is_active: boolean
}

export interface IFacultyFilter {
  name?: string
  is_faculty?: boolean
  is_active?: boolean
}

export interface IProfessionalSchool {
  id: number
  uuid: string
  name: string
  denomination: string
  is_active: boolean
  admin_faculty: number
}

export interface IProfessionalSchoolFilter {
  id?: number
  name?: string
  name__icontains?: string
  is_active?: boolean
  admin_unity__id?: number
  admin_unity__uuid?: string
}
