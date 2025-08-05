'use client'
import { ReactNode } from 'react'
import Image from 'next/image'
import { BreadcrumbCustom } from './bread-crumb-custom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

interface HeaderProps {
  title?: string
  description?: string
  backgroundImage?: string
  hideBackButton?: boolean
  showBreadcrumb?: boolean
  urlBack?: string
  rightContent?: ReactNode
  bottomContent?: ReactNode
}

export default function BannerSection({
  title,
  description,
  backgroundImage,
  hideBackButton,
  showBreadcrumb,
  rightContent,
  bottomContent,
  urlBack,
}: HeaderProps) {
  const router = useRouter()
  const pathname = usePathname()

  const pathBack = pathname.split('/').slice(0, -1).join('/')
  const isHome = pathname.split('/').length === 2

  const handleBack = () => {
    if (urlBack) {
      router.push(urlBack)
      return
    }
    router.push(pathBack)
  }

  return (
    <div className="relative bg-gradient-to-r from-blue-900 via-blue-700 to-blue-800 pt-16 md:pt-20 lg:pt-28 min-h-[320px] sm:min-h-[260px] flex items-center flex-col gap-3">
      {/* Imagen de fondo */}
      {backgroundImage && (
        <section className="absolute inset-0 -z-0">
          <Image
            src={backgroundImage}
            alt="background-image"
            fill
            className="object-cover object-center"
            priority
          />
        </section>
      )}

      {/* Capas de opacidad */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 opacity-50 z-10" />
      <div className="absolute inset-0 bg-black opacity-80 z-0" />

      <div className="container relative z-10 flex flex-col md:flex-row justify-between w-full">
        {/* Contenido izquierdo (centrado verticalmente) */}
        <div className="flex flex-col gap-4 lg:gap-5 items-start justify-center w-full">
          {showBreadcrumb && <BreadcrumbCustom />}
          {!hideBackButton && (
            <>
              {isHome ? (
                <div className="w-6 h-6 flex items-center gap-2 text-white">
                  <Home
                    className="text-white"
                    size={18}
                  />
                  Inicio
                </div>
              ) : (
                <Button
                  variant="link"
                  onClick={handleBack}
                  className="text-white hover:text-white px-0"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
                </Button>
              )}
            </>
          )}
          <div className="flex flex-col gap-4 lg:gap-6">
            {title && (
              <h3 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-2 max-w-5xl">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-gray-300 max-w-2xl">{description}</p>
            )}
          </div>
        </div>

        {/* Contenido derecho (ajustable según bottomContent) */}
        {rightContent && (
          <div
            className={`w-full flex justify-center ${
              bottomContent ? 'self-start' : 'self-end'
            } md:self-auto`}
          >
            {rightContent}
          </div>
        )}
      </div>

      {/* Contenido inferior si existe */}
      {bottomContent && (
        <div className="mt-8 w-full z-20 container">{bottomContent}</div>
      )}
      {!rightContent && <div className="w-full h-16" />}
    </div>
  )
}
