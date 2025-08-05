import { APPLICATION_METADATA } from '@/config/meta'
import { AcademicPortal } from '@/modules'
import { Metadata } from 'next'
import {
  fetchEnrrollmentStageList,
  fetchProgramsStudent,
} from '@/api/admission'
import { getUserAuth } from '@/lib/session'

export const metadata: Metadata = APPLICATION_METADATA.PAGES.HOME

export default async function Page() {
  const dataUser = await getUserAuth()

  const [response, programsRes] = await Promise.all([
    fetchEnrrollmentStageList({
      person_uuid: dataUser?.person_token || '',
    }),
    fetchProgramsStudent({
      person_uuid: dataUser?.person_token || '',
    }),
  ])

  return (
    <AcademicPortal
      enrollmentsList={response.data || []}
      programsList={programsRes.data || []}
    />
  )
}

export const dynamic = 'force-dynamic'
