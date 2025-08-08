'use server'
import { IPerson, IPersonFilter, IPersonUser, IResApi } from '@/types'

import { fetchPersonService } from '../core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'

const API_BASE = ENDPOINTS_CONFIG.PERSON

const dataDefault: IResApi<IPerson> = {
  count: 0,
  next: null,
  previous: null,
  results: []
}

export const fetchPersons = async (
  filters?: IPersonFilter
): Promise<{
  status: number
  data?: IResApi<IPerson>
  errors?: string[]
}> => {
  const queryParams = new URLSearchParams()
  if (filters) {
    for (const key in filters) {
      queryParams.append(key, filters[key as keyof IPersonFilter] as string)
    }
  }

  const url = `${API_BASE.PERSON}?${queryParams.toString()}`

  try {
    const response = await fetchPersonService.get(url)

    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      return {
        status: response.status,
        errors: errorMessages,
        data: dataDefault
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IResApi<IPerson> = await response.json()
    return {
      status: response.status,
      data: responseData
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
      data: dataDefault
    }
  }
}

export const fetchPerson = async (
  personToken: string
): Promise<{
  status: number
  data?: IPerson
  errors?: string[]
}> => {
  const url = `${API_BASE.PERSON}${personToken}/`

  try {
    const response = await fetchPersonService.get(url)
    console.log('Response:', response)

    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      return {
        status: response.status,
        errors: errorMessages,
        data: undefined
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IPerson = await response.json()
    return {
      status: response.status,
      data: responseData
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
      data: undefined
    }
  }
}

export const getUserPerson = async (
  filters?: IPersonFilter
): Promise<{
  status: number
  data?: IPersonUser[]
  errors?: string[]
}> => {
  const queryParams = new URLSearchParams()
  if (filters) {
    for (const key in filters) {
      queryParams.append(key, filters[key as keyof IPersonFilter] as string)
    }
  }

  const URL_PATH = `${API_BASE.GET_PERSON_USER}?${queryParams.toString()}`

  try {
    const response = await fetchPersonService.get(URL_PATH)
    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      return {
        status: response.status,
        errors: errorMessages,
        data: undefined
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IPersonUser[] = await response.json()
    return {
      status: response.status,
      data: responseData
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
      data: undefined
    }
  }
}
