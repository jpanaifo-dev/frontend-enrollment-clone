'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface LayoutProfileProps {
  headerContent?: React.ReactNode
  children: React.ReactNode
  removeWrapper?: boolean
  handleNavigation?: (path: string) => void
  items: {
    title: string
    url: string
  }[]
}
export const LayoutProfileWrapper = ({
  children,
  headerContent,
  items,
  handleNavigation,
  removeWrapper,
}: LayoutProfileProps) => {
  const pathname = usePathname()

  function getActiveClass(url: string) {
    return pathname === url
      ? 'border-l-5 border-primary-800 text-primary-800 font-medium'
      : ''
  }

  return (
    <main className="w-full bg-transparent">
      <main className="container mx-auto py-8">
        {headerContent && headerContent}
        <div className="flex flex-col md:flex-row gap-8 md:items-start">
          <nav className="bg-white rounded-lg h-fit w-full sm:min-w-[240px] sm:w-80 sm:sticky top-16 sm:top-20 z-30">
            <div className="p-4 border-b">
              <h2 className="font-bold text-lg">Tus detalles</h2>
            </div>
            <div className="">
              {items.map((data, index) => (
                <div key={index}>
                  {handleNavigation ? (
                    <Button
                      onClick={() => {
                        if (handleNavigation) {
                          handleNavigation(data.url)
                        }
                      }}
                      variant="ghost"
                      className={cn(
                        'rounded-none w-full flex items-center justify-start p-4 text-gray-500 hover:bg-gray-100',
                        getActiveClass(data.url)
                      )}
                    >
                      {data.title}
                    </Button>
                  ) : (
                    <Button
                      variant="link"
                      className={cn(
                        'rounded-none w-full flex items-center justify-start p-4 text-gray-500 hover:bg-gray-100 ',
                        getActiveClass(data.url)
                      )}
                      asChild
                    >
                      <Link
                        href={data.url}
                        className="no-underline hover:no-underline"
                      >
                        {data.title}
                      </Link>
                    </Button>
                  )}
                  <hr />
                </div>
              ))}
            </div>
          </nav>
          <article
            className={
              (cn('w-full'),
              removeWrapper
                ? 'sm:w-full py-0'
                : 'bg-white rounded-lg p-4 sm:p-8 w-full grid')
            }
          >
            {children}
          </article>
        </div>
      </main>
    </main>
  )
}
