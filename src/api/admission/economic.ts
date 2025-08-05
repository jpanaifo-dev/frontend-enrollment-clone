'use server'
import { fetchEconomicService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import {
  AcademicPayment,
  IResApi,
  EconomicFilter,
  AcademicConcept,
} from '@/types'

const API_BASE = ENDPOINTS_CONFIG.PAYMENT

export const fetchPaymentList = async (
  filters?: EconomicFilter
): Promise<IResApi<AcademicPayment>> => {
  const params = new URLSearchParams()

  Object.entries(filters ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value.toString())
    }
  })

  const url = `${API_BASE.PAYMENT}?${params.toString()}`

  try {
    const response = await fetchEconomicService.get(url)
    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      console.error('error pagos:', errorResponse)
      return {
        count: 0,
        next: null,
        previous: null,
        results: [],
      }
    }
    const responseData: IResApi<AcademicPayment> = await response.json()
    return responseData
  } catch (error) {
    console.error('Error al realizar la petición de pagos:', error)
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    }
  }
}

export const fetchConceptList = async (): Promise<AcademicConcept[]> => {
  const url = API_BASE.CONCEPT

  try {
    const response = await fetchEconomicService.get(url)
    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      console.error('error conceptos:', errorResponse)
      return []
    }
    const responseData: AcademicConcept[] = await response.json()
    return responseData
  } catch (error) {
    console.error('Error al realizar la petición de conceptos:', error)
    return []
  }
}
