import React from 'react'
import { ChangeEmailForm, ChangePasswordForm } from '../components'
import { IUserAuth } from '@/types'

interface AccountSettingsPageProps {
  userAuth: IUserAuth
}

export const AccountSettingsPage = ({ userAuth }: AccountSettingsPageProps) => {
  return (
    <main className="grid grid-cols-1 gap-4 px-4 pb-4 md:gap-8 ">
      <ChangeEmailForm userAuth={userAuth} />
      <ChangePasswordForm userToken={userAuth?.user_token} />
    </main>
  )
}
