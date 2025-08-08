import { fetchPerson } from '@/api/persons'
import { Footer, NavbarUser } from '@/components/app'
import { getUserAuth } from '@/lib/session'
import { IPerson, IUserAuth } from '@/types'

async function getCookieData() {
  const cookieData = getUserAuth()
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData)
    }, 1000)
  )
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const sessionData = await getCookieData()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  let personData: IPerson | null = null
  const [person] = await Promise.all([fetchPerson(data?.person_token)])

  if (person.status === 200 && person.data) {
    personData = person.data
  } else {
    console.error('Error al obtener los datos del usuario:', person)
  }

  return (
    <main className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <NavbarUser
        person={personData}
        menuItems={[]}
        email={data?.email}
      />
      {children}
      <Footer />
    </main>
  )
}
