import { IRole } from './IRole'
import { IModules } from './IModules'
import { IUser } from './IUser'

export interface IUserRole {
    id: number
    id_user: IUser
    id_role: IRole
    id_module: IModules
    is_active: boolean
}