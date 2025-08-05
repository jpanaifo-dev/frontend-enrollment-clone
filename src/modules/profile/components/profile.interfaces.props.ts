import {
  ICountry,
  IPersonAcademic,
  IPersonAcademicList,
  IPersonContact,
  IPersonJob,
  IPersonJobList,
  IPersonLanguage,
} from '@/types'

export interface AcademicInfoFormProps {
  person_token: string
  activeDialog?: boolean
  idEdit?: string
  defaultData?: IPersonAcademicList[]
  academicInfo?: IPersonAcademic
}

export interface LanguageInfoFormProps {
  person_token: string
  activeDialog?: boolean
  idEdit?: string
  defaultData?: IPersonLanguage[]
  languageInfo?: IPersonLanguage
}

export interface IContactInfoFormProps {
  person_token: string
  defaultData?: IPersonContact
  disabled?: boolean
}

export interface JobInfoFormProps {
  person_token: string
  activeDialog?: boolean
  idEdit?: string
  defaultData?: IPersonJobList[]
  jobInfo?: IPersonJob
  countryDefaultData: ICountry | null
}

export interface DialogAcademicInfoFormProps {
  person_token?: string
  defaultData?: IPersonAcademic
}
export interface DialogLanguageInfoFormProps {
  person_token?: string
  defaultData?: IPersonLanguage
}
