import React from 'react'
import { Metadata } from 'next'
import { APPLICATION_METADATA } from '@/config/meta'
import { fetchConceptList, fetchPaymentList } from '@/api/admission'
import { getUserAuth } from '@/lib/session'
import { IUserAuth } from '@/types'
import { fetchPerson } from '@/api/persons'
import { PaymentHistory } from '@/modules/payments'
import { NoResults } from '@/components/app'

export const metadata: Metadata = APPLICATION_METADATA.PAGES.PAYMENTS

const CODE_CONCEPT = '782'

export default async function Page() {
  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  if (!data?.person_token) {
    return (
      <NoResults
        title="No se encontraron resultados"
        message="No se encontraron resultados para la búsqueda realizada."
      />
    )
  }

  const person = await fetchPerson(data?.person_token)

  const response = await fetchPaymentList({
    concept__code: CODE_CONCEPT,
    document_number__icontains: person.data?.document_number,
  })

  const conceptsList = await fetchConceptList()

  const conceptData = conceptsList.find(
    (concept) => concept.code === CODE_CONCEPT
  )

  return (
    <>
      <PaymentHistory
        concepData={conceptData}
        paymentsList={response.results}
      />
    </>
  )
}
