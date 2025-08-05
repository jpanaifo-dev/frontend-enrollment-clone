'use server'
import { fetchCoreService } from '../core'
import { IResApi, IUniversity, IUniversityQuery } from '@/types'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'

export async function getUniversities(filter: IUniversityQuery): Promise<{
  status: number
  data?: IResApi<IUniversity>
  errors?: string[]
}> {
  const URL_BASE = ENDPOINTS_CONFIG.CORE.UNIVERSITY
  const params = new URLSearchParams()

  for (const key in filter) {
    const typedKey = key as keyof IUniversityQuery
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
      const responseData: IResApi<IUniversity> = await response.json()
      return {
        status: response.status,
        data: responseData,
      }
    }
  } catch (error) {
    console.error('Error fetching universities:', error)
    return {
      status: 500,
      errors: ['Error connecting to the server.'],
    }
  }
}
