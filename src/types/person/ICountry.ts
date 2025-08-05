export interface ICountry {
  uuid: string
  id: number
  name: string
  code: string
  abbreviation: string
  nationality: string
}

export interface ICountryFilter {
  id?: number
  uuid?: string
  code?: string
  name?: string
  name__icontains?: string
  abbreviation?: string
  abbreviation__icontains?: string
  nationality?: string
  nationality__icontains?: string
}
