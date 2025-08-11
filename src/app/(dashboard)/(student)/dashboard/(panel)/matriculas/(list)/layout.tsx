import { fetchProgramsStudent } from '@/api/admission'
import { BannerSection } from '@/components/app'
import { APP_URL } from '@/config/urls-data/student.urls.config'
import { getUserAuth } from '@/lib/session'
import { EnrollmentFilters } from '@/modules'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const dataUser = await getUserAuth()
  const responsePrograms = await fetchProgramsStudent({
    person_uuid: dataUser?.person.id.toString() || '',
  })

  const welcomeMessage = `Mis Matrículas`
  const description = `Bienvenido al módulo de matrículas. Aquí podrás revisar, gestionar y realizar el seguimiento de tus inscripciones académicas de forma sencilla y segura.`

  return (
    <>
      <div className="min-h-screen bg-slate-100">
        <BannerSection
          title={welcomeMessage}
          description={description}
          urlBack={APP_URL.HOME.URL_BASE}
        />
        <main className="container mx-auto space-y-6 pt-20 sm:pt-16 pb-10 flex flex-col gap-5">
          <EnrollmentFilters programsAssigned={responsePrograms.data || []} />
          {children}
        </main>
      </div>
    </>
  )
}
