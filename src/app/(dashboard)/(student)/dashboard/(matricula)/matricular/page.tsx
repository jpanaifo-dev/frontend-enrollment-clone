import { getUserAuth } from '@/lib/session'
import { PaymentValidateForm } from '@/modules/matricula/pages/validate-pay'
import { IUserAuth } from '@/types'
import React from 'react'

export default async function Page() {
  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  return (
    <PaymentValidateForm
      email={data.email}
      person_uuid={data.person_token}
      key={data.person_token}
    />
  )
}
