import { IMenu } from './IMenu'

export interface ISubMenu {
  id: number
  id_menu: IMenu
  name: string
  is_active: boolean
}