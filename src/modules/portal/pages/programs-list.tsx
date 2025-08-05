import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { IStudentProgram } from '@/types'
import { GraduationCap, Building2, BookOpen } from 'lucide-react'

interface IProps {
  programsList?: IStudentProgram[]
}

export const ProgramsList = (props: IProps) => {
  const { programsList } = props
  const getProgramTypeColor = (type: string) => {
    const colors = {
      pregrado: 'bg-blue-50 text-blue-700 border-blue-200',
      posgrado: 'bg-purple-50 text-purple-700 border-purple-200',
      maestría: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      doctorado: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      especialización: 'bg-orange-50 text-orange-700 border-orange-200',
    }
    return (
      colors[type.toLowerCase() as keyof typeof colors] ||
      'bg-gray-50 text-gray-700 border-gray-200'
    )
  }

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

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className={`${getProgramTypeColor(
                        programa.program_type
                      )} font-medium rounded-full`}
                    >
                      {programa.program_type}
                    </Badge>
                    <Badge
                      className={cn(
                        'flex items-center gap-1 rounded-full',
                        programa.state === 'Activo'
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                      )}
                    >
                      {programa.state}
                    </Badge>
                  </div>

                  {/* Facultad */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    <span className="font-medium">Facultad:</span>
                    <span>{programa.unity_name}</span>
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
