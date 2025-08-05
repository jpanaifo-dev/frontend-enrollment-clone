export interface IPersonFile {
  id: number
  person: number
  file: string
  file_Type: number
  is_active: boolean
  is_valid: boolean
  created_at: string
  updated_at: string
}

export interface IPersonFileRequirements {
  requirement: IPersonFileRequirement
  file: IPersonFile | null
}

export interface IPersonFileRequirement {
  id: number
  name: string
  description: string
  is_active: boolean
  requirement_type: number
}

export interface IFileList {
  id: number
  uuid: string
  person_uuid: string
  application_uuid: string | null
  service: string | null
  file: string | null
  is_active: boolean
  is_valid: boolean
  expiration_date: string | null
  created_at: string
  updated_at: string
  requirement: number
  file_Type: number
}

export interface IFileListFilter {
  uuid?: string
  person_uuid?: string
  application_uuid?: string
  requirement?: string
  service?: string
  file_Type?: string
  is_active?: string
  is_valid?: string
  expiration_date?: string
  expiration_date__lt?: string
  expiration_date__gt?: string
  created_at?: string
  created_at__lt?: string
  created_at__gt?: string
  updated_at?: string
  updated_at__lt?: string
  updated_at__gt?: string
}
