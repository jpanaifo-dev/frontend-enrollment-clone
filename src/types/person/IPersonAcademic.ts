import { IAcademicDegree } from './IDocument'
import { IPerson } from './IPerson'

export interface IPersonAcademic {
  id: number
  institution: string
  program_career: string
  start_date: string
  end_date: string
  diploma_date: string
  is_degree: boolean
  person: number
  academic_degree: number
  file: string | null
}

export interface IPersonLanguage {
  id: number
  language: string
  level: string
  institution: string
  file: string | null
  person: number
}

export interface IPersonAcademicList {
  id: number
  institution: string
  program_career: string
  start_date: string
  end_date: string
  diploma_date: string
  is_degree: boolean
  person: IPerson
  academic_degree: IAcademicDegree
  file: string | null
}

export interface IPersonAcademicFilter {
  id?: number
  institution?: string
  programCareer?: string
  programCareer__icontains?: string
  person_token?: string
}

export interface IPersonLanguageFilter {
  id?: number
  person_token?: string
}
