import { IModules } from './IModules'

export interface IMenu {
  id: number
  id_module: IModules
  name: string
  icon: string
  is_active: boolean
}