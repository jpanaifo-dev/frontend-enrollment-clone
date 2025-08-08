import { Metadata } from 'next'
import { fetchPerson } from '@/api/persons/person'
import { NavbarUser } from '@/components/app'
import { admisionMenu } from '@/config/urls-data/menu-items-list'
import { getUserAuth } from '@/lib/session'
import { IPerson, IUserAuth } from '@/types'
import { CONFIG_META } from '@/config/meta/meta.config'
import { Footer } from '@/components/app/miscellaneous/footer'

export const metadata: Metadata = CONFIG_META

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  let personData: IPerson = {} as IPerson

  const [person] = await Promise.all([fetchPerson(data?.person.id.toString())])

  if (person.status === 200 && person.data) {
    personData = person.data
  } else {
    console.error('Error al obtener los datos del usuario:', person)
  }

  return (
    <>
      <NavbarUser
        person={personData}
        menuItems={admisionMenu}
        email={data?.email}
        isAuthenticaded
      />
      {children}
      <Footer />
    </>
  )
}
