import { fetchPersonsInfo } from '@/api/persons/person-contact'
import { APPLICATION_METADATA } from '@/config/meta'
import { getUserAuth } from '@/lib/session'
import { ContactInfoForm } from '@/modules'
import { NoResults } from '@/components/app'
import { IPersonContact, IUserAuth } from '@/types'
import { Metadata } from 'next'

export const metadata: Metadata = APPLICATION_METADATA.PAGES.CONTACT_INFO

export default async function Page() {
  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  let personData: IPersonContact = {} as IPersonContact

  try {
    const persons = await fetchPersonsInfo({
      person_token: data?.person_token,
    })
    if (persons.status === 200 && persons.data) {
      personData = persons?.data[0]
    }
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error)
  }

  if (!personData) {
    return (
      <NoResults
        title="No se encontraron resultados"
        message="No se encontraron resultados para la búsqueda realizada."
      />
    )
  }

  return (
    <ContactInfoForm
      person_token={data?.person_token}
      defaultData={personData}
    />
  )
}
