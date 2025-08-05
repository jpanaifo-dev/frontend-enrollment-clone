import { Params } from '@/types'
import { fetchDetailsStudentEnrollment } from '@/api/admission'
import { NoResults } from '@/components/app'
import { StudentDetailsComponent } from '@/modules'

interface IProps {
  params: Params
}

export default async function Page(props: IProps) {
  const params = await props.params
  const enrollmentId = await params.uuid

  const response = await fetchDetailsStudentEnrollment({
    enrollment_id: enrollmentId?.toString() || '',
  })

  if (response.data === null || response.data === undefined) {
    return (
      <div>
        <NoResults
          title="Error al cargar la matrícula"
          message="No se pudo cargar la información de la matrícula. Por favor, inténtalo de nuevo más tarde."
          isActive
          buttonText="Recargar"
        />
      </div>
    )
  }

  return <StudentDetailsComponent data={response.data} />
}
