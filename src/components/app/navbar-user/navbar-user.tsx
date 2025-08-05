'use client'
import { NavigationMenuDemo } from './menu-items'
import { NavigationMenuDemoProps } from './INavbarProps'
import { MobileMenu } from './menu-items-mobile'
import { LogoRender } from '../miscellaneous'
import { ProfilePopover } from '../miscellaneous/profile-popover'
import Link from 'next/link'
import { APP_URL } from '@/config/urls-data/student.urls.config'
import { MENU_PROFILE } from '@/config/urls-data/profile-menu'

export const NavbarUser = ({
  menuItems,
  person,
  email,
}: NavigationMenuDemoProps) => {
  return (
    <nav className="bg-blue-950 border-b border-white sticky top-0 right-0 left-0 z-40">
      <header className="container mx-auto  py-3 flex items-center justify-between gap-8">
        <LogoRender
          href={
            !person
              ? APP_URL.HOME.LANDING
              : APP_URL.HOME.URL_BASE
          }
          className="w-full max-w-[160px]"
        />
        {/*Menu de navegación desktop*/}
        <NavigationMenuDemo
          person={person}
          menuItems={menuItems}
          email={email}
        />
        <section className="w-fit flex items-center gap-4">
          {/*Menu de perfil*/}
          {person && (
            <ProfilePopover
              profileData={{
                names: `${person?.names} ${person?.last_name1} ${person?.last_name2}`,
                email,
                photo: person?.photo,
              }}
              menuSections={MENU_PROFILE.STUDENT}
              showProgress={false}
            />
          )}
          {/* {!person && <AuthDialog variant="nav" />} */}
          {!person && (
            <Link
              href={APP_URL.AUTH.LOGIN}
              className="text-white truncate hover:text-gray-300 text-sm"
              // className="text-white bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-md"
            >
              Iniciar sesión
            </Link>
          )}
          {/*Menu de navegación mobile*/}
          <MobileMenu
            items={menuItems}
            isAuthenticaded={!!person}
          />
        </section>
      </header>
    </nav>
  )
}
