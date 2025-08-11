import { FileText, GraduationCap, History } from 'lucide-react'
import { APP_URL } from '@/config/urls-data/student.urls.config'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MatriculasListSection } from './matriculas-list'
import { ProgramsList } from './programs-list'
import { IEnrollmentStage } from '@/types'
import { IStudentProgram } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface AcademicPortalProps {
  enrollmentsList: IEnrollmentStage[]
  programsList?: IStudentProgram[]
}

export const AcademicPortal = (props: AcademicPortalProps) => {
  const { enrollmentsList, programsList } = props

  const isEmpty = enrollmentsList?.length === 0

  return (
    <div className="w-full p-6 grid grid-cols-1 gap-6 md:gap-10 lg:gap-14">
      {/* Sección de programas académicos y matrículas actuales */}
      <div className="col-span-1 flex flex-col gap-6">
        <div className="flex items-start gap-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Mis Programas Académicos
            </h2>
            <p className="text-sm text-muted-foreground">
              Consulta los programas académicos a los que perteneces.
            </p>
          </div>
          <Badge
            variant="secondary"
            className="ml-auto"
          >
            {programsList?.length}{' '}
            {programsList?.length === 1 ? 'programa' : 'programas'}
          </Badge>
        </div>
        <ProgramsList programsList={programsList} />
      </div>

      <hr className="text-2xl font-bold text-foreground" />

      {/* Sección de matrículas actuales */}
      <div className="grid gap-6 md:grid-cols-1">
        <div className="col-span-2 flex flex-col gap-6">
          <div className="flex items-start gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Mis Matrículas Actuales
              </h2>
              <p className="text-sm text-muted-foreground">
                Consulta las matrículas activas para el período académico
                actual.
              </p>
            </div>
            <Badge
              variant="secondary"
              className="ml-auto"
            >
              {enrollmentsList?.length}{' '}
              {enrollmentsList?.length === 1 ? 'matrícula' : 'matrículas'}
            </Badge>
          </div>
          {!isEmpty && (
            <MatriculasListSection enrollmentsList={props.enrollmentsList} />
          )}
          {isEmpty && (
            <Card className="border-dashed border-2 border-yellow-200 bg-yellow-50/50 shadow-none">
              <CardContent className="flex flex-col items-center justify-center py-4 text-center">
                <div className="rounded-full bg-yellow-100 p-3 mb-4">
                  <FileText className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  No hay matrículas disponibles
                </h3>
                <p className="text-sm text-yellow-700 max-w-sm">
                  Actualmente no tienes matrículas disponibles para el período
                  académico actual. Si crees que debería haber una matrícula
                  disponible, contacta con tu institución para más información.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <hr className="text-2xl font-bold text-foreground" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Tarjeta de Matrículas con diseño moderno */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 p-6 shadow-sm border border-blue-200">
          <div className="relative z-10">
            <div className="mb-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/10 mb-4">
                <History className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              ¿Necesitas revisar tus matrículas anteriores?
            </h3>
            <p className="text-blue-600 mb-6 leading-relaxed">
              Accede a tu historial completo de matrículas y verifica su estado
              en tiempo real.
            </p>
            <Link href={APP_URL.MATRICULA.LIST}>
              <Button variant="outline">Ver Historial de Matrículas</Button>
            </Link>
          </div>
          {/* Elemento decorativo */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200/30 rounded-full blur-xl"></div>
          <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-indigo-200/40 rounded-full blur-lg"></div>
        </div>
      </div>
    </div>
  )
}
