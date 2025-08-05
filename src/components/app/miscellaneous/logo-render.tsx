import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const LogoRender = ({
  nameApp,
  subtitle,
  href,
  className,
}: {
  nameApp?: string
  subtitle?: string
  href: string
  className?: string
}) => {
  return (
    <section
      id="logo"
      className={cn(
        'flex items-center gap-2 w-fit hover:cursor-pointer',
        className
      )}
    >
      <Link
        href={href}
        className="flex items-center gap-2 w-fit hover:cursor-pointer"
      >
        {!nameApp && (
          <Image
            src="/brands/postgrado_unap_white.webp"
            alt="logo-epg"
            className="w-52 h-14"
            width={300}
            height={40}
          />
        )}
        {nameApp && (
          <h1 className={cn(' font-semibold text-xs text-white', className)}>
            {nameApp || 'ESCUELA DE POSTGRADO UNAP'}
          </h1>
        )}
        {subtitle && (
          <h2 className="w-32 min-w-32 font-semibold text-xs text-white">
            {subtitle}
          </h2>
        )}
      </Link>
    </section>
  )
}
