'use server'
import { fetchAcademicService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import { CoursesData } from '@/types'

const API_BASE = ENDPOINTS_CONFIG.ACADEMIC

export const fetchGroupsEnrrollmentStageList = async ({
  enrollment_stage_id,
}: {
  enrollment_stage_id: string
}): Promise<{
  status: number
  data?: CoursesData | null
  errors?: string[]
}> => {
  const url = `${API_BASE.COURSE_GROUP}?enrollment_stage_id=${enrollment_stage_id}`

  try {
    const response = await fetchAcademicService.get(url)
    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      console.error('grupos matriculas', errorResponse)
      const errorMessages = Object.values(errorResponse).flat()
      console.error('grupos matriculas', errorMessages)
      return {
        status: response.status,
        errors: errorMessages,
        data: null,
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: CoursesData = await response.json()
    return {
      status: response.status,
      data: responseData,
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
      data: null,
    }
  }
}
