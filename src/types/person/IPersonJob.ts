import { IJobSector } from './IJobSector'

export interface IPersonJobBase {
  id: number
  company_name: string
  occupation: string
  area: string
  start_date: string | null
  end_date: string | null
  country_uuid: string
  country_name?: string
  job_modality: string
}

export interface IPersonJob extends IPersonJobBase {
  job_sector: number
}

export interface IPersonJobList extends IPersonJobBase {
  job_sector: IJobSector
}

export interface IPersonJobFilter {
  id?: number
  institution?: string
  programCareer?: string
  programCareer__icontains?: string
  person_token?: string
}
