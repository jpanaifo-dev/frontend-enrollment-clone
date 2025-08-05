'use server'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { IUserAuth } from '@/types'

const APP_NAME = process.env.APP_NAME
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function getUserAuthData() {
  const cookieStore = await cookies()
  const session = await cookieStore.get(`${APP_NAME}_session`)
  if (!session?.value) return null

  const { payload } = await jwtVerify(session?.value, encodedKey, {
    algorithms: ['HS256']
  })
  return payload.data as IUserAuth
}
