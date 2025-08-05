import { fetchPerson } from '@/api/persons'
import { BannerSection } from '@/components/app'
import { getUserAuth } from '@/lib/session'
import { LayoutProfile } from '@/modules'
import { IPerson, IUserAuth } from '@/types'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  let personData: IPerson = {} as IPerson

  try {
    const person = await fetchPerson(data?.person_token)
    if (person.status === 200 && person.data) {
      personData = person.data
    }
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error)
  }

  const name = personData?.uuid ? `${personData?.names}` : ''

  return (
    <>
      <BannerSection
        title={`¡Hola ${name}!`}
        description="Completa tus datos personales para continuar con el proceso de admisión."
      />
      <LayoutProfile token={data?.person_token}>{children}</LayoutProfile>
    </>
  )
}
