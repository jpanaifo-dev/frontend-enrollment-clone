'use server'
import { fetchUserService } from '../core/fetch-services'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import { ChangePasswordFormValues } from '@/modules/account'

interface IChangePasswordResponse {
  message: string
}

export const changePassword = async (
  data: ChangePasswordFormValues
): Promise<{
  status: number
  data?: IChangePasswordResponse
  errors?: string[]
}> => {
  const path = ENDPOINTS_CONFIG.ACCOUNTS.CHANGE_PASSWORD

  try {
    const response = await fetchUserService.post(path, data)
    if (!response.ok) {
      const errorResponse: { [key: string]: string[] } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      console.error('Error al cambiar la contraseña:', errorMessages)
      return {
        status: response.status,
        errors: errorMessages,
      }
    }

    const responseData: IChangePasswordResponse = await response.json()
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
