'use server'
import { IDocumentType } from '@/types'
import { fetchPersonService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'

const apiDataUrl = ENDPOINTS_CONFIG.PERSON.DOCUMENT_TYPE

export const fetchDocumentsType = async (): Promise<{
  status: number
  data?: IDocumentType[]
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
    const responseData: IDocumentType[] = await response.json()
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
