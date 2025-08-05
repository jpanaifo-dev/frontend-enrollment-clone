'use server'
import { IUbigeo, IUbigeoFilter, IUbigeoFilterDataQuery } from '@/types'
import { fetchCoreService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'

const apiDataUrl = ENDPOINTS_CONFIG.CORE

export const fetchUbigeo = async (
  filters: IUbigeoFilter
): Promise<{
  status: number
  data?: IUbigeo[]
  errors?: string[]
}> => {
  const params = new URLSearchParams()
  for (const key in filters) {
    if (filters[key as keyof IUbigeoFilter]) {
      params.append(key, filters[key as keyof IUbigeoFilter] as string)
    }
  }

  const url = `${apiDataUrl.UBIGEO}?${params}`

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

    // Si el estado es exitoso, parseamos los datos
    const responseData: IUbigeo[] = await response.json()
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

export const fetchUbigeoFilterData = async (
  filter: IUbigeoFilterDataQuery
): Promise<{
  status: number
  data?: IUbigeo[]
  errors?: string[]
}> => {
  const url = `${apiDataUrl.UBIGEO_FILTERDATA}?query=${filter.query}`

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
    // Si el estado es exitoso, parseamos los datos
    const responseData: IUbigeo[] = await response.json()
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
