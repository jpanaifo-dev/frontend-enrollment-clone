import { Card, CardContent } from '@/components/ui/card'
import { IStudentProgram } from '@/types'
import { GraduationCap, Building2, BookOpen } from 'lucide-react'

interface IProps {
  programsList?: IStudentProgram[]
}

export const ProgramsList = (props: IProps) => {
  const { programsList } = props

  if (!programsList || programsList.length === 0) {
    return (
      <Card className="border-dashed border-2 border-yellow-200 bg-yellow-50/50">
        <CardContent className="flex flex-col items-center justify-center py-4 text-center">
          <div className="rounded-full bg-yellow-100 p-3 mb-4">
            <GraduationCap className="w-8 h-8 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            No hay programas disponibles
          </h3>
          <p className="text-sm text-yellow-700 max-w-sm">
            Actualmente no tienes programas académicos asignados. Contacta con
            tu institución para más información.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {programsList.map((programa, index) => (
          <Card
            key={index}
            className="transition-all duration-200 hover:shadow-md hover:border-primary/20 group shadow-none"
          >
            <CardContent className="p-6 py-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  {/* Nombre del programa */}
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                        {programa.program_name}
                      </h3>
                    </div>
                  </div>

                  {/* Facultad */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    <span className="font-medium">Facultad:</span>
                    <span>{programa.program_description}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
