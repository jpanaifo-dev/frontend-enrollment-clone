'use server'
import { IPerson } from '@/types'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import { PersonInfoSchemaType } from '@/modules'
import { fetchPersonService } from '@/api/core'
import { revalidatePath } from 'next/cache'
import { APP_URL } from '@/config/urls-data/student.urls.config'

const API_BASE = ENDPOINTS_CONFIG.PERSON

export const updatePerson = async (
  personToken: string,
  data: PersonInfoSchemaType
): Promise<{
  status: number
  data?: IPerson
  errors?: string[]
}> => {
  const url = `${API_BASE.PERSON}${personToken}/`

  // const headers = await buildHeaders('PERSON')

  try {
    const response = await fetchPersonService.put(url, data)
    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      console.error('Error al actualizar la persona:', errorMessages)
      return {
        status: response.status,
        errors: errorMessages,
        data: undefined,
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IPerson = await response.json()
    revalidatePath(APP_URL.PROFILE.URL_BASE)
    return {
      status: response.status,
      data: responseData,
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

export const updatePersonPhoto = async ({
  personToken,
  photo,
}: {
  personToken: string
  photo: string
}): Promise<{
  status: number
  data?: IPerson
  errors?: string[]
}> => {
  const url = `${ENDPOINTS_CONFIG.PERSON.UPDATE_PHOTO}`

  // const headers = await buildHeaders('PERSON')

  try {
    const response = await fetchPersonService.post(url, {
      person_token: personToken,
      photo,
    })
    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      console.error('Error al actualizar la foto de la persona:', errorMessages)
      return {
        status: response.status,
        errors: errorMessages,
        data: undefined,
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IPerson = await response.json()
    revalidatePath(APP_URL.PROFILE.URL_BASE)
    return {
      status: response.status,
      data: responseData,
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
