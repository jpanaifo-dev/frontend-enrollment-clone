import { Card, CardContent } from '@/components/ui/card'
import { IStudentProgram } from '@/types'
import { GraduationCap } from 'lucide-react'
import Image from 'next/image'

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
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {programsList.map((programa, index) => (
          <Card
            key={index}
            className="transition-all duration-200 shadow-none hover:border-primary/20 group overflow-hidden flex flex-col md:flex-row h-full relative pt-0 pb-0"
          >
            {/* Imagen del programa */}
            <div className="relative h-40 w-full md:w-48 md:h-52 md:flex-shrink-0 lg:w-64 lg:h-56">
              <Image
                src={programa.program_background || '/images/default-program-bg.webp'}
                alt={programa.program_name}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                width={600}
                height={200}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:bg-gradient-to-r" />

              {/* Chip en esquina superior derecha */}
              {programa.program_code && (
                <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                  {programa.program_code}
                </div>
              )}
            </div>

            {/* Contenido del card */}
            <CardContent className="p-4 md:p-4 flex-1 lg:p-6">
              <div className="flex flex-col gap-3 h-full">
                {/* Nombre del programa */}
                <h3 className="font-extrabold text-xl lg:text-2xl text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {programa.program_name}
                </h3>
                {/* Descripción */}
                <p className="line-clamp-4">{programa.program_description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
