'use client'
import { handleLogout } from '@/modules/auth/utils/logout'
import { STUDENT_URLS_APP } from './student.urls.config'

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
        href: STUDENT_URLS_APP.PROFILE.URL_BASE,
      },
      // {
      //   label: 'Mi cuenta',
      //   href: ADMISSION_URLS_APP.PROFILE.ACCOUNT,
      // },
      {
        label: 'Cerrar sesión',
        onClick: () => {
          handleLogout(STUDENT_URLS_APP.AUTH.LOGIN)
          localStorage.removeItem('loginMethod')
        },
      },
    ],
  },
]

export const MENU_PROFILE = {
  STUDENT: MENU_PROFILE_STUDENT,
}
