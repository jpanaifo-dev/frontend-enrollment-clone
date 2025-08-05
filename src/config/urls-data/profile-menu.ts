'use client'
import { handleLogout } from '@/modules/auth/utils/logout'
import { APP_URL } from './student.urls.config'

export interface MenuItem {
  label: string
  href?: string
  onClick?: () => void | Promise<void>
}

export interface MenuSection {
  label?: string
  items: MenuItem[]
}

export const MENU_PROFILE_STUDENT: MenuSection[] = [
  {
    label: 'Opciones',
    items: [
      {
        label: 'Perfil',
        href: APP_URL.PROFILE.URL_BASE,
      },
      // {
      //   label: 'Mi cuenta',
      //   href: ADMISSION_URLS_APP.PROFILE.ACCOUNT,
      // },
      {
        label: 'Cerrar sesión',
        onClick: () => {
          handleLogout(APP_URL.AUTH.LOGIN)
          localStorage.removeItem('loginMethod')
        },
      },
    ],
  },
]

export const MENU_PROFILE = {
  STUDENT: MENU_PROFILE_STUDENT,
}
