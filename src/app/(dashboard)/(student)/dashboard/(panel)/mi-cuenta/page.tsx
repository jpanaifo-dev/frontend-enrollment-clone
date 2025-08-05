import { ChangeEmailForm } from '@/modules/account'
import { getUserAuth } from '@/lib/session'
import { IUserAuth } from '@/types'

export default async function Page() {
  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  return <ChangeEmailForm userAuth={data} />
}
