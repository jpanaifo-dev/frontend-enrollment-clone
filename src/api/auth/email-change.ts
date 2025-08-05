'use server'
import { fetchUserService } from '../core/fetch-services'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import { EmailChangeFormValues } from '@/modules/account'

interface IChangeResponse {
  message: string
}

export const emailChangeFunction = async (
  data: EmailChangeFormValues
): Promise<{
  status: number
  data?: IChangeResponse
  errors?: string[]
}> => {
  const path = ENDPOINTS_CONFIG.ACCOUNTS.EMAIL_CHANGE

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

    const responseData: IChangeResponse = await response.json()
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
