export interface IUser {
  id: number
  password: string
  last_login: Date | null
  is_superuser: boolean
  username: string
  first_name: string
  last_name: string
  email: string
  is_staff: boolean
  is_active: boolean
  date_joined: Date
}

export interface IUserCreate {
  email: string
  password: string
  confirmPassword: string
  names: string
  last_name1: string
  last_name2: string
  document_number: string
  document_type: number
}
