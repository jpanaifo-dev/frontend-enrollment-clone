'use server'
import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'
import { IUserAuth } from '@/types'

const isProduction = process.env.NODE_ENV === 'production'
const urlUserServProd = process.env.APP_API_USER_SERVICE
const urlUserServLocal = process.env.APP_API_USER_SERVICE_LOCAL
const urlBase = isProduction ? urlUserServProd : urlUserServLocal

const APP_NAME = process.env.APP_NAME

const APP_TOKEN_ADMISION = process.env.APP_TOKEN_USER

export async function fetchCore(path: string, options: RequestInit) {
  const cookie = (await cookies()).get(`${APP_NAME}_session`)?.value
  const session = await decrypt(cookie)
  const data: IUserAuth = (await session?.data) as unknown as IUserAuth
  const token = data?.access_token

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (APP_TOKEN_ADMISION) {
    headers['app-token'] = APP_TOKEN_ADMISION
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const newOptions = {
    ...options,
    headers: { ...headers, ...(options?.headers || {}) },
  }

  const url = `${urlBase}${path}`

  return fetch(url, newOptions)
}
