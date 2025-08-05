import { IPerson } from './IPerson'
import { ICountry } from './ICountry'
import { IUbigeo } from './IUbigeo'

export interface IPersonContact {
  id: number
  ubigeo_address_uuid: string
  address: string
  email: string
  phone: string
  whatsapp_phone: string
  linkedin: string
  person: number
}

export interface IPersonInfoView {
  id: number
  fk_person: IPerson
  fk_country: ICountry
  fk_ubigeo_address: IUbigeo
  fk_ubigeo_birth: IUbigeo
  birthdate: Date
  gender: Date
  email: string
  phone: string
  address: string
  whatsapp: string
}

export interface IPersonInfoFilter {
  email?: string
  email__icontains?: string
  person_token?: string
}

export interface IPersonInfoForm {
  id: number
  country_uuid: string
  ubigeo_address_uuid: string
  ubigeo_birth_uuid: string
  address: string
  birthdate: string
  gender: string
  email: string
  phone: string
  whatsapp_phone: string
  person: number
  marital_status: number
}

export interface IProgressInfo {
  person_token: string
  progress_percentage: number
  missing_fields: IMissingField
}

export interface IMissingField {
  [key: string]: string | string[]
}

export interface IProgressInfoFilter {
  person_token: string
}
