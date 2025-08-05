'use client'

import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { usePathname } from 'next/navigation'
import { NavigationMenuDemoProps } from './INavbarProps'

export function NavigationMenuDemo({ menuItems }: NavigationMenuDemoProps) {
  const pathname = usePathname()

  function isPathnameStartingWith(path: string) {
    return pathname.startsWith(path)
  }

  return (
    <section className="w-full hidden md:flex justify-center items-center gap-4">
      <NavigationMenu>
        <NavigationMenuList>
          {menuItems.map((item) => (
            <NavigationMenuItem key={item.title}>
              {item.children && item.children.length > 0 ? (
                <>
                  <NavigationMenuTrigger
                    className={cn(
                      'bg-transparent hover:bg-transparent hover:text-gray-300 focus:text-white focus:bg-transparent',
                      isPathnameStartingWith(item.href) &&
                        'font-black text-white'
                    )}
                  >
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {item?.children?.map((child) => (
                        <ListItem
                          key={child.title}
                          title={child.title}
                          href={child.href}
                        >
                          {child.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <Link
                  href={item.href || '#'}
                  passHref
                >
                  <NavigationMenuLink
                    className={cn(
                      'text-sm bg-transparent hover:bg-transparent hover:text-gray-300 focus:text-gray-100 focus:bg-text-gray-100',
                      'font-normal text-gray-400 p-3 rounded-md leading-none no-underline outline-none transition-colors',
                      pathname === item.href &&
                        'font-bold text-white focus:bg-text-gray-100'
                    )}
                  >
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </section>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
