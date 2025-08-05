export interface IUbigeo {
  id: number
  uuid: string
  code: number
  region: string
  province: string
  district: string
}

export interface IUbigeoFilterDataQuery {
  query: string
}

export interface IUniversity {
  id: number
  uuid: string
  name: string
  country: null
  website: string
}

export interface IUniversityQuery {
  search?: string
}

export interface IUbigeoFilter {
  id?: number
  uuid?: string
  code?: number
  region?: string
  region__icontains?: string
  province?: string
  province__icontains?: string
  district?: string
  district__icontains?: string
}
