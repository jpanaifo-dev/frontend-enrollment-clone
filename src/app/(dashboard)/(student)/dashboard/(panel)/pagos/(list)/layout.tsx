import { BannerSection } from '@/components/app'
import { APP_URL } from '@/config/urls-data/student.urls.config'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const welcomeMessage = `Mis pagos`
  const description = `Aquí puedes ver el estado de tus pagos, descargar recibos y más.`
  return (
    <>
      <div className="min-h-screen bg-slate-100">
        <BannerSection
          title={welcomeMessage}
          description={description}
          urlBack={APP_URL.HOME.URL_BASE}
        />
        <main className="container mx-auto space-y-6 pt-20 sm:pt-16 pb-10 flex flex-col gap-5">
          {children}
        </main>
      </div>
    </>
  )
}
