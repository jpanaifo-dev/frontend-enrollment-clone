'use server'
import { IPersonContact, IPersonInfoFilter } from '@/types'
import { revalidatePath } from 'next/cache'

import { fetchPersonService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import { PersonContactSchemaType } from '@/modules'

const apiDataUrl = ENDPOINTS_CONFIG.PERSON.PERSON_INFO

export const fetchPersonsInfo = async (
  filters?: IPersonInfoFilter
): Promise<{
  status: number
  data?: IPersonContact[]
  errors?: string[]
}> => {
  const queryParams = new URLSearchParams()
  if (filters) {
    for (const key in filters) {
      queryParams.append(key, filters[key as keyof IPersonInfoFilter] as string)
    }
  }

  const url = `${apiDataUrl}?${queryParams.toString()}`

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
        data: [],
      }
    }
    // Si el estado es exitoso, parseamos los datos
    const responseData: IPersonContact[] = await response.json()
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

export const updatePersonContact = async (
  personToken: string,
  data: PersonContactSchemaType
): Promise<{
  status: number
  data?: IPersonContact
  errors?: string[]
}> => {
  const url = `${apiDataUrl}${personToken}/`

  try {
    const response = await fetchPersonService.put(url, data)

    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      const errorMessages = Object.entries(errorResponse).map(
        ([key, value]) => `${key}: ${value.join(', ')}`
      )
      return {
        status: response.status,
        errors: errorMessages,
        data: undefined,
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IPersonContact = await response.json()
    revalidatePath('/admision/informacion-personal/contacto')
    return {
      status: response.status,
      data: responseData,
      errors: [],
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
      data: undefined,
    }
  }
}
