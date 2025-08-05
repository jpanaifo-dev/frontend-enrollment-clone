// import {
//   menuAcademicosData,
//   menuAdminData,
//   menuAdmisionAdminData,
//   menuDocsData,
//   menuEconomicData,
// } from '@/types/menusApp'
// import { LucideIcon } from 'lucide-react'

// type Submenu = {
//   href: string
//   label: string
//   active?: boolean
// }

// type Menu = {
//   href: string
//   label: string
//   active?: boolean
//   icon: LucideIcon
//   submenus?: Submenu[]
// }

// type Group = {
//   groupLabel: string
//   menus: Menu[]
// }

// import { MenuConfigApps } from '@/types/configApps'

// // Función para obtener el menú según el nombre de la aplicación y el pathname
// export function getMenuList(
//   appName: MenuConfigApps,
//   pathname: string
// ): Group[] {
//   let menuData: Group[]

//   pathname = pathname.split('/').slice(0, 3).join('/')

//   switch (appName) {
//     case 'panel-admin':
//       menuData = menuAdminData
//       break
//     case 'docs':
//       menuData = menuDocsData // Puedes agregar un menú de documentación
//       break
//     case 'academic':
//       menuData = menuAcademicosData
//       break
//     case 'economic':
//       menuData = menuEconomicData
//       break
//     case 'panel-admin-admision':
//       menuData = menuAdmisionAdminData
//       break
//     default:
//       menuData = []
//   }
//   // Actualizar el estado `active` según el `pathname`
//   return menuData.map((group) => ({
//     ...group,
//     menus: group.menus.map((menu) => ({
//       ...menu,
//       active: pathname === menu.href,
//       submenus: menu.submenus?.map((submenu) => ({
//         ...submenu,
//         active: pathname === submenu.href,
//       })),
//     })),
//   }))
// }
