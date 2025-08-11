import { getUserAuth } from '@/lib/session'
import { ChangePasswordForm } from '@/modules/account'
import { IUserAuth } from '@/types'

export default async function Page() {
  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  return <ChangePasswordForm userToken={data?.user_token} />
}
