'use server'
import { IResponseMessage } from '@/types'
import { ActionsTypes, IActionsTypes } from '@/lib/constants'

import { fetchUserService } from '../core/fetch-services'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'

export const emailAccessCode = async (data: {
  email: string
  action: IActionsTypes
}): Promise<{ status: number; data?: IResponseMessage; errors?: string[] }> => {
  // const path = URL_EMAIL_ACCESS_CODE
  const path = `${ENDPOINTS_CONFIG.AUTH.EMAIL_ACCESS_CODE}`

  try {
    const response = await fetchUserService.post(`${path}`, {
      ...data,
      action: data?.action,
    })

    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()

      return {
        status: response.status,
        errors: errorMessages,
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IResponseMessage = await response.json()
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

export const verifyAccessCode = async (data: {
  model: string
  code: string
  action: IActionsTypes
}): Promise<{ status: number; data?: IResponseMessage; errors?: string[] }> => {
  const path = `${ENDPOINTS_CONFIG.AUTH.VERIFY_ACCESS_CODE}`

  try {
    const response = await fetchUserService.post(`${path}`, {
      ...data,
      action: data?.action,
    })

    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      return {
        status: response.status,
        errors: errorMessages,
      }
    }

    const responseData: IResponseMessage = await response.json()
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

export const recoveryPassword = async (data: {
  email: string
  password: string
  confirm_password: string
  code_token: string
}): Promise<{ status: number; data?: IResponseMessage; errors?: string[] }> => {
  const path = `${ENDPOINTS_CONFIG.AUTH.RECOVERY_PASSWORD}`

  try {
    const response = await fetchUserService.post(`${path}`, {
      ...data,
      action: ActionsTypes.FORGOT_PASSWORD,
    })

    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      return {
        status: response.status,
        errors: errorMessages,
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IResponseMessage = await response.json()
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

export const confirmPostulation = async (data: {
  email: string
  person_token: string
  convocatory_token: string
}): Promise<{ status: number; data?: IResponseMessage; errors?: string[] }> => {
  const path = `${ENDPOINTS_CONFIG.AUTH.EMAIL_APPLICANT}`

  try {
    const response = await fetchUserService.post(`${path}`, data)

    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      return {
        status: response.status,
        errors: errorMessages,
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IResponseMessage = await response.json()
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
