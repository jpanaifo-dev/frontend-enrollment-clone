'use server'
import { ICountry, ICountryFilter } from '@/types'
import { fetchCoreService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'

const apiDataUrl = ENDPOINTS_CONFIG.CORE

export const fetchCountry = async (
  filters?: ICountryFilter
): Promise<{
  status: number
  data?: ICountry[]
  errors?: string[]
}> => {
  const params = new URLSearchParams()
  for (const key in filters) {
    if (filters[key as keyof ICountryFilter]) {
      params.append(key, filters[key as keyof ICountryFilter] as string)
    }
  }

  const url = `${apiDataUrl.COUNTRY}?${params}`

  try {
    const response = await fetchCoreService.get(url)

    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      return {
        status: response.status,
        errors: errorMessages,
        data: [],
      }
    }

    const responseData: ICountry[] = await response.json()
    return {
      status: response.status,
      data: responseData,
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
      data: [],
    }
  }
}

export const fetchCountryFilterData = async (
  filter: string
): Promise<{
  status: number
  data?: ICountry[]
  errors?: string[]
}> => {
  const url = `${apiDataUrl.COUNTRY_FILTERDATA}?query=${filter}`

  try {
    const response = await fetchCoreService.get(url)
    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      return {
        status: response.status,
        errors: errorMessages,
        data: [],
      }
    }

    const responseData: ICountry[] = await response.json()
    return {
      status: response.status,
      data: responseData,
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
      data: [],
    }
  }
}

export const fetchCountryById = async (
  countryId: string
): Promise<ICountry | null> => {
  const url = `${apiDataUrl.COUNTRY}/${countryId}`

  try {
    const response = await fetchCoreService.get(url)

    if (!response.ok) {
      return null
    }

    const responseData: ICountry = await response.json()
    return responseData
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return null
  }
}
