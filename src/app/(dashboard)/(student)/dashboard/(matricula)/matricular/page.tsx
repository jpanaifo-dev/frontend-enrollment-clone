import React from 'react'
import {
  fetchDetailsStudentFile,
  fetchEnrollmentStageBy,
  fetchGroupsEnrrollmentStageList,
} from '@/api/admission'
import { Params, SearchParams } from '@/types'
import { EnrollmentForm } from '@/modules/matricula/pages/EnrollmentForm'
interface IProps {
  params: Params
  searchParams: SearchParams
}

export default async function Page(props: IProps) {
  const params = await props.params
  const searchParams = await props.searchParams
  const matricula_id = searchParams.matricula
  const student_uuid = searchParams.student
  const payment_uuid = params.slug

  const responseGrupos = await fetchGroupsEnrrollmentStageList({
    enrollment_stage_id: String(matricula_id),
  })

  const response = await fetchEnrollmentStageBy({
    stage_uuid: matricula_id?.toString() || '',
  })

  const studentData = await fetchDetailsStudentFile({
    student_file_uuid: String(student_uuid),
  })

  return (
    <EnrollmentForm
      studentInfo={studentData?.data || undefined}
      studentUuid={student_uuid?.toString() || undefined}
      enrollmentStage={response.data || undefined}
      coursesData={responseGrupos.data || []}
      paymentUuid={payment_uuid?.toString() || undefined}
    />
  )
}
