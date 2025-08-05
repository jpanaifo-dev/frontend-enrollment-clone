'use server'
import { IUserSuccessCreate, IUserCreate } from '@/types'
import { fetchUserService } from '../core/fetch-services'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'

export const createAccount = async (
  data: IUserCreate
): Promise<{
  status: number
  data?: IUserSuccessCreate
  errors?: string[]
}> => {
  const path = ENDPOINTS_CONFIG.ACCOUNTS.CREATE_ACCOUNT

  try {
    const response = await fetchUserService.post(path, data)

    if (!response.ok) {
      const errorResponse: { [key: string]: string[] } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      return {
        status: response.status,
        errors: errorMessages,
      }
    }

    const responseData: IUserSuccessCreate = await response.json()
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
