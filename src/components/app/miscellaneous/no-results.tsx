'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface NoResultsProps {
  imageSrc?: string
  title: string
  message: string
  buttonText?: string
  onButtonClick?: () => void
  isActive?: boolean
  children?: React.ReactNode
}

export const NoResults = ({
  isActive,
  imageSrc,
  title,
  message,
  buttonText,
  onButtonClick,
  children
}: NoResultsProps) => {
  const handleReload = () => {
    window.location.reload()
  }

  return (
    <>
      {isActive && (
        <main className="flex flex-col items-center justify-center sm:p-4 text-center min-h-[calc(100vh-400px)] ">
          <div className="flex flex-col items-center justify-center text-center max-w-2xl">
            <div className="pb-4 md:pb-6">
              <Image
                src={imageSrc || '/images/equis.webp'}
                alt={title}
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2 max-w-lg uppercase">
              {title}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-3xl">{message}</p>
            {buttonText && onButtonClick && (
              <Button onClick={onButtonClick}>{buttonText}</Button>
            )}
            <Button variant="outline" onClick={handleReload} className="mt-4">
              Volver a recargar
            </Button>
            {children}
          </div>
        </main>
      )}
    </>
  )
}
