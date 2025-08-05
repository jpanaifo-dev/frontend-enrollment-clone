import Image from 'next/image'
import Link from 'next/link'
import { AUTH_URLS_APP } from '@/config/urls-data'

interface AuthLayoutProps {
  children: React.ReactNode
  subTitle?: string
}

export function AuthLayout({ children, subTitle }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left side */}
      <div className="hidden lg:flex w-3/5 bg-[#001529] relative flex-col p-8 justify-between">
        <Link
          href={`${AUTH_URLS_APP.LOGIN.URL_BASE}`}
          className="hover:cursor-pointer z-10"
        >
          <div className="flex items-center gap-2 text-white">
            <Image
              src="/brands/escudo-epg.webp?height=40&width=40"
              alt="EPG-UNAP Logo"
              width={35}
              height={35}
              className="object-contain w-9 h-9 min-w-9 min-h-9 max-w-9 max-h-9"
            />
            <span className="text-xl font-semibold">SIGAE - UNAP</span>
          </div>
        </Link>
        <div className="mt-32 text-white max-w-xl">
          <h1 className="text-4xl font-bold mb-4">Matrícula</h1>
          {subTitle ? (
            <p className="text-lg opacity-90">{subTitle}</p>
          ) : (
            <p className="text-lg opacity-90">
              Bienvenido al sistema de matrícula. Aquí podrás gestionar tu
              inscripción, revisar los requisitos y dar seguimiento a tu proceso
              académico de manera sencilla y segura.
            </p>
          )}
        </div>
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-20 -z-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0c50 0 50 100 100 100V0H0z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E\")",
            backgroundSize: 'cover',
          }}
        />
      </div>

      {/* Right side */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">{children}</div>
      </div>
    </div>
  )
}
