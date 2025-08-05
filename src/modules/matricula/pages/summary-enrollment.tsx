import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { AlertTriangle } from 'lucide-react'

export const SummaryMatriculaPage = () => {
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="space-y-6">
        {/* Resumen de matrícula */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-1">Resumen de matrícula</h2>
          <p className="text-sm text-gray-600 mb-4">
            Periodo Académico: 2025 - I
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <p className="text-gray-500">Alumno</p>
              <p className="font-medium">Luis Huamán López</p>
            </div>
            <div>
              <p className="text-gray-500">Código de alumno</p>
              <p className="font-medium">12312345</p>
            </div>
            <div>
              <p className="text-gray-500">Programa</p>
              <p className="font-medium">Maestría en Gestión Pública</p>
            </div>
            <div>
              <p className="text-gray-500">Fecha de matrícula</p>
              <p className="font-medium">26 de mayo de 2025</p>
            </div>
          </div>

          <h3 className="font-bold mb-3">Cursos a matricular</h3>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Código</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead className="w-[80px]">Grupo</TableHead>
                <TableHead className="w-[80px] text-right">Créditos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>IS301</TableCell>
                <TableCell>Metodologías Ágiles Avanzadas</TableCell>
                <TableCell>A</TableCell>
                <TableCell className="text-right">4</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>IS301</TableCell>
                <TableCell>Gestión de Proyectos de Software</TableCell>
                <TableCell>B</TableCell>
                <TableCell className="text-right">3</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>IS301</TableCell>
                <TableCell>Arquitectura de Software</TableCell>
                <TableCell>B</TableCell>
                <TableCell className="text-right">4</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>IS301</TableCell>
                <TableCell>Metodologías Ágiles Avanzadas</TableCell>
                <TableCell>A</TableCell>
                <TableCell className="text-right">3</TableCell>
              </TableRow>
            </TableBody>
            <TableRow className="bg-gray-50">
              <TableCell
                colSpan={2}
                className="font-medium"
              >
                Total de cursos: 4 Cursos
              </TableCell>
              <TableCell
                colSpan={2}
                className="text-right font-medium"
              >
                Total de créditos: 14 Créditos
              </TableCell>
            </TableRow>
          </Table>
        </Card>

        {/* Vista Previa del Horario */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-2">Vista Previa del Horario</h2>
          <p className="text-sm text-gray-600 mb-4">
            Así quedará tu horario con los cursos seleccionados
          </p>

          <div className="overflow-x-auto">
            <Table className="border-collapse">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px] border">Hora</TableHead>
                  <TableHead className="border text-center">Lunes</TableHead>
                  <TableHead className="border text-center">Martes</TableHead>
                  <TableHead className="border text-center">
                    Miércoles
                  </TableHead>
                  <TableHead className="border text-center">Jueves</TableHead>
                  <TableHead className="border text-center">Viernes</TableHead>
                  <TableHead className="border text-center">Sábado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* 07:00 */}
                <TableRow>
                  <TableCell className="border font-medium">07:00</TableCell>
                  <TableCell className="border p-0">
                    <div className="bg-purple-100 p-2 h-full">
                      <p className="text-xs font-medium">
                        Arquitectura de Software
                      </p>
                      <p className="text-xs">Grupo B</p>
                      <p className="text-xs">Aula: D-301</p>
                    </div>
                  </TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                </TableRow>

                {/* 08:00 */}
                <TableRow>
                  <TableCell className="border font-medium">08:00</TableCell>
                  <TableCell className="border p-0">
                    <div className="bg-purple-100 p-2 h-full">
                      <p className="text-xs font-medium">
                        Arquitectura de Software
                      </p>
                      <p className="text-xs">Grupo B</p>
                      <p className="text-xs">Aula: D-301</p>
                    </div>
                  </TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                </TableRow>

                {/* 09:00 */}
                <TableRow>
                  <TableCell className="border font-medium">09:00</TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                </TableRow>

                {/* 10:00 */}
                <TableRow>
                  <TableCell className="border font-medium">10:00</TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                </TableRow>

                {/* 11:00 */}
                <TableRow>
                  <TableCell className="border font-medium">11:00</TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                </TableRow>

                {/* 12:00 */}
                <TableRow>
                  <TableCell className="border font-medium">12:00</TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border p-0">
                    <div className="bg-yellow-100 p-2 h-full">
                      <p className="text-xs font-medium">
                        Gestión de Proyectos de Software
                      </p>
                      <p className="text-xs">Grupo B</p>
                      <p className="text-xs">Aula: D-401</p>
                    </div>
                  </TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                </TableRow>

                {/* 13:00 */}
                <TableRow>
                  <TableCell className="border font-medium">13:00</TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border p-0">
                    <div className="bg-yellow-100 p-2 h-full">
                      <p className="text-xs font-medium">
                        Gestión de Proyectos de Software
                      </p>
                      <p className="text-xs">Grupo B</p>
                      <p className="text-xs">Aula: D-401</p>
                    </div>
                  </TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border p-0">
                    <div className="bg-green-100 p-2 h-full">
                      <p className="text-xs font-medium">
                        Metodologías Ágiles Avanzadas
                      </p>
                      <p className="text-xs">Grupo A</p>
                      <p className="text-xs">Aula: D-304</p>
                    </div>
                  </TableCell>
                  <TableCell className="border"></TableCell>
                </TableRow>

                {/* 14:00 */}
                <TableRow>
                  <TableCell className="border font-medium">14:00</TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border p-0">
                    <div className="bg-green-100 p-2 h-full">
                      <p className="text-xs font-medium">
                        Metodologías Ágiles Avanzadas
                      </p>
                      <p className="text-xs">Grupo A</p>
                      <p className="text-xs">Aula: D-401</p>
                    </div>
                  </TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border p-0">
                    <div className="bg-green-100 p-2 h-full">
                      <p className="text-xs font-medium">
                        Metodologías Ágiles Avanzadas
                      </p>
                      <p className="text-xs">Grupo A</p>
                      <p className="text-xs">Aula: D-304</p>
                    </div>
                  </TableCell>
                  <TableCell className="border"></TableCell>
                </TableRow>

                {/* 15:00 */}
                <TableRow>
                  <TableCell className="border font-medium">15:00</TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                </TableRow>

                {/* 16:00 */}
                <TableRow>
                  <TableCell className="border font-medium">16:00</TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                </TableRow>

                {/* 17:00 */}
                <TableRow>
                  <TableCell className="border font-medium">17:00</TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                </TableRow>

                {/* 18:00 */}
                <TableRow>
                  <TableCell className="border font-medium">18:00</TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                </TableRow>

                {/* 19:00 */}
                <TableRow>
                  <TableCell className="border font-medium">19:00</TableCell>
                  <TableCell className="border p-0">
                    <div className="bg-pink-100 p-2 h-full">
                      <p className="text-xs font-medium">Calidad de Software</p>
                      <p className="text-xs">Grupo C</p>
                      <p className="text-xs">Aula: D-302</p>
                    </div>
                  </TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border p-0">
                    <div className="bg-pink-100 p-2 h-full">
                      <p className="text-xs font-medium">Calidad de Software</p>
                      <p className="text-xs">Grupo C</p>
                      <p className="text-xs">Aula: D-302</p>
                    </div>
                  </TableCell>
                  <TableCell className="border"></TableCell>
                </TableRow>

                {/* 20:00 */}
                <TableRow>
                  <TableCell className="border font-medium">20:00</TableCell>
                  <TableCell className="border p-0">
                    <div className="bg-pink-100 p-2 h-full">
                      <p className="text-xs font-medium">Calidad de Software</p>
                      <p className="text-xs">Grupo C</p>
                      <p className="text-xs">Aula: D-302</p>
                    </div>
                  </TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border p-0">
                    <div className="bg-pink-100 p-2 h-full">
                      <p className="text-xs font-medium">Calidad de Software</p>
                      <p className="text-xs">Grupo C</p>
                      <p className="text-xs">Aula: D-302</p>
                    </div>
                  </TableCell>
                  <TableCell className="border"></TableCell>
                </TableRow>

                {/* 21:00 */}
                <TableRow>
                  <TableCell className="border font-medium">21:00</TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Mensaje de advertencia */}
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-800 mb-1">Importante</p>
            <p className="text-sm text-amber-700">
              Verifica con atención los cursos seleccionados. Después de
              confirmar la matrícula, solo podrás hacer una modificación.
            </p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline">Volver</Button>
          <Button className="bg-[#003366] hover:bg-[#002244]">Confirmar</Button>
        </div>
      </div>
    </div>
  )
}
