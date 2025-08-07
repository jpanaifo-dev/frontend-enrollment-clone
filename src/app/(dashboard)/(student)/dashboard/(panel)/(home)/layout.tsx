import { BannerSection } from '@/components/app'
import { fetchPerson } from '@/api/persons'
import { getUserAuth } from '@/lib/session'
import { IPerson, IUserAuth } from '@/types'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  let personData: IPerson = {} as IPerson

  const [person] = await Promise.all([fetchPerson(data?.person_token)])

  if (person.status === 200 && person.data) {
    personData = person.data
  } else {
    console.error('Error al obtener los datos del usuario:', person)
  }

  const name = personData?.names || ''
  const welcomeMessage = `¡Bienvenido, ${name}!`
  const description = `Nos alegra contar contigo en este nuevo periodo académico. A través de esta plataforma podrás gestionar tu matrícula de manera rápida y segura.
Revisa tus datos, selecciona tus cursos y completa tu inscripción en pocos pasos.`

  return (
    <div className="min-h-screen bg-slate-100">
      <BannerSection
        title={welcomeMessage}
        description={description}
        backgroundImage="/images/bg-matricula.webp"
      />
      <main className="container mx-auto space-y-6 pt-20 sm:pt-16 pb-10">
        {children}
      </main>
    </div>
  )
}
