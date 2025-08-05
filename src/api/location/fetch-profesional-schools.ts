'use server'
import { fetchCoreService } from '../core'
import { IProfessionalSchool, IProfessionalSchoolFilter } from '@/types'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'

export async function getProfesionalSchools(
  filter: IProfessionalSchoolFilter
): Promise<{
  status: number
  data?: IProfessionalSchool[]
  errors?: string[]
}> {
  const URL_BASE = ENDPOINTS_CONFIG.CORE.PROFESIONAL_SCHOOL
  const params = new URLSearchParams()

  for (const key in filter) {
    const typedKey = key as keyof IProfessionalSchoolFilter
    params.append(key, filter[typedKey] as string)
  }

  const url = `${URL_BASE}?${params.toString()}`

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
      }
    } else {
      const responseData: IProfessionalSchool[] = await response.json()
      return {
        status: response.status,
        data: responseData,
      }
    }
  } catch (error) {
    console.error('Error deleting requirement:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
    }
  }
}
