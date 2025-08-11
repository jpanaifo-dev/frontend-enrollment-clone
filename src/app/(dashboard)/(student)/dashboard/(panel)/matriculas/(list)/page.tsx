import React from 'react'
import { IEnrollmentList, SearchParams } from '@/types'
import {
  fetchProgramsStudent,
  fetchStudentEnrollmentList,
} from '@/api/admission'
import { getUserAuth } from '@/lib/session'
import { HistorialTable } from '@/modules'
import { Metadata } from 'next'
import { APPLICATION_METADATA } from '@/config/meta'

export const metadata: Metadata = APPLICATION_METADATA.PAGES.ENROLLMENT_HISTORY

interface PageProps {
  searchParams: SearchParams
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams
  const student_uuid = searchParams.student || ''

  const dataUser = await getUserAuth()
  const responsePrograms = await fetchProgramsStudent({
    person_uuid: dataUser?.person.id.toString() || '',
  })

  const uuid_student = responsePrograms.data?.[0]?.id || student_uuid

  const responseHistorial = await fetchStudentEnrollmentList({
    student_uuid: String(uuid_student),
  })

  const listMatriculas: IEnrollmentList[] = responseHistorial.data || []

  return <HistorialTable listMatriculas={listMatriculas} />
}
