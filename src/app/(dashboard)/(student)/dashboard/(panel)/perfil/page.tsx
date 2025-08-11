import { Metadata } from 'next'
import { fetchPerson } from '@/api/persons'
import { getUserAuth } from '@/lib/session'
import { fetchCountry, fetchUbigeo } from '@/api/location'
import { ICountry, IPerson, IUbigeo, IUserAuth } from '@/types'
import { NoResults } from '@/components/app'
import { APPLICATION_METADATA } from '@/config/meta'
import { PersonalInfoForm } from '@/modules/profile'

export const metadata: Metadata = APPLICATION_METADATA.PAGES.PERSONAL_INFO

export default async function Page() {
  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  let personData: IPerson = {} as IPerson
  let countryData: ICountry | null = null
  let ubigeoData: IUbigeo | null = null

  try {
    const person = await fetchPerson(data?.person.id.toString())
    if (person.status === 200 && person.data) {
      personData = person.data
    }
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error)
  }

  if (!personData) {
    return (
      <NoResults
        isActive={true}
        title="No hay datos"
        message="No se encontraron datos de la persona."
      />
    )
  }

  if (personData.country_uuid) {
    const country = await fetchCountry({
      uuid: personData.country_uuid,
    })
    countryData = country?.data?.[0] || null
  }

  if (personData.ubigeo_birth_uuid) {
    const ubigeo = await fetchUbigeo({
      uuid: personData.ubigeo_birth_uuid,
    })
    ubigeoData = ubigeo?.data?.[0] || null
  }

  return (
    <PersonalInfoForm
      defaultData={personData}
      countryDefaultData={countryData}
      ubigeoDefaultData={ubigeoData}
      isEditing={false}
    />
  )
}
