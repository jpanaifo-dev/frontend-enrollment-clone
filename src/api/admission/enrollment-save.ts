'use server'
import { fetchAcademicService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import { IEnrollmentStageCreate } from '@/modules/matricula/schema'

const API_BASE = ENDPOINTS_CONFIG.ACADEMIC

export const createEnrollment = async (
  data: IEnrollmentStageCreate
): Promise<{
  status: number
  data?: {
    enrollment_id: string
    message: string
  }
  errors?: string[]
}> => {
  const path = API_BASE.ENROLLMENT_CREATE

  try {
    const response = await fetchAcademicService.post(path, data)
    console.log('Response from createEnrollment:', response)
    if (!response.ok) {
      const errorResponse: { [key: string]: string[] } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      console.error('Error al crear la matrícula:', errorMessages)
      return {
        status: response.status,
        errors: errorMessages,
      }
    }

    const responseData = await response.json()
    return {
      status: response.status,
      data: responseData,
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
    }
  }
}
