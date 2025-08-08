// import { IPersonType } from './IPersonType'
import { IUser } from '../accounts'

export interface IPerson {
  id: number
  uuid: string
  document_number: string
  names: string
  last_name1: string
  last_name2: string
  photo: string
  document_type: number
  person_type: number
  gender: string | null
  marital_status: number | null
  ubigeo_birth_uuid: string | null
  birthdate: string | null
  comunity_indigenous: string | null
  disability: string | null
  country_uuid: string | null
  native_language: string | null
}

export interface IPersonPostulant extends IPerson {
  phone: string | null
  email: string | null
  whatsapp: string | null
  postulant: boolean
}

// export interface IPersonView {
//   uuid: string
//   user: IUser
//   document: IDocumentType
//   person_type: IPersonType
//   names: string
//   last_name1: string
//   last_name2: string
//   photo: string
// }

export interface IPersonList {
  data: IPerson[]
  total: number
}

export interface IPersonFilter {
  page?: number
  person_token?: string
  document_number?: string
  document_number__icontains?: string
  names__icontains?: string
  last_name1__icontains?: string
  last_name2__icontains?: string
}

export interface IPersonForm {
  document_number: string
  names: string
  last_name1: string
  last_name2: string
  photo: File | undefined
  document_type: number
  person_type: number
}

export interface IPersonUser {
  user: Pick<IUser, 'username' | 'email'>[]
  person: Pick<
    IPerson,
    'document_number' | 'names' | 'last_name1' | 'last_name2'
  > & { full_name: string }
}
