'use server'
import { SERVICES_MODULES, ServicesModulesType } from '@/config/modules.cofig'
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'
import { IUserAuth } from '@/types'

export async function buildHeaders(
  module: keyof ServicesModulesType
): Promise<Record<string, string>> {
  const cookie = (await cookies()).get(`${process.env.APP_NAME}_session`)?.value
  const session = await decrypt(cookie)
  const userData: IUserAuth = (await session?.data) as unknown as IUserAuth
  const token = userData?.access_token
  // const uuid_user = userData?.user_token

  const { TOKEN } = SERVICES_MODULES[module]
  const headers: Record<string, string> = {}

  if (TOKEN) headers['app-token'] = TOKEN
  if (token) headers['Authorization'] = `Bearer ${token}`
  // if (uuid_user) headers['user-token'] = uuid_user

  return headers
}
