import { IPerson } from '@/types'

export interface NavigationItem {
  title: string
  href: string
  description?: string
  children?: NavigationItem[]
}

export interface NavigationMenuDemoProps {
  menuItems: NavigationItem[]
  person?: IPerson | null
  email?: string
  progressValue?: number
  isAuthenticaded?: boolean
}
