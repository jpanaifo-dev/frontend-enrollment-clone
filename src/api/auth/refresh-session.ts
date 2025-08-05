'use server'

import { IRefreshSession, IUserAuth } from '@/types'
import { createSession } from '@/lib/session'
import { fetchUserService } from '../core/fetch-services'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import { getUserAuth } from '@/lib/session'

export const fetchRefreshSession = async (): Promise<{
  status: number
  data?: IRefreshSession
  errors?: string[]
}> => {
  const userAuth: IUserAuth = (await getUserAuth()) as IUserAuth

  const URL_BASE = ENDPOINTS_CONFIG.AUTH.REFRESH_SESSION

  try {
    const response = await fetchUserService.post(URL_BASE, {
      refresh_token: userAuth.refresh_token,
    })

    if (!response.ok) {
      const errorResponse: { [key: string]: string[] } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      return {
        status: response.status,
        errors: errorMessages,
      }
    }

    const responseData: IRefreshSession = await response.json()

    const newSession: IUserAuth = {
      ...userAuth,
      access_token: responseData.access_token,
      expires_in: responseData.expires_in,
    }

    await createSession(newSession, newSession.expires_in)
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
