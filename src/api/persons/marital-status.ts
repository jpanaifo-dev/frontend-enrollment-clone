'use server'
import { IMaritalStatus } from '@/types'
import { fetchPersonService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'

const apiDataUrl = ENDPOINTS_CONFIG.PERSON.MARITAL_STATUS

export const fetchMaritalStatus = async (): Promise<{
  status: number
  data?: IMaritalStatus[]
  errors?: string[]
}> => {
  const url = `${apiDataUrl}`

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
    const responseData: IMaritalStatus[] = await response.json()
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
