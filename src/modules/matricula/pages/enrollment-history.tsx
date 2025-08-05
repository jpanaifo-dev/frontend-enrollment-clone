import { Card, CardContent } from '@/components/ui/card'
import { APP_URL } from '@/config/urls-data/student.urls.config'
import { IEnrollmentList } from '@/types'
import { FileText } from 'lucide-react'
import Link from 'next/link'

// Table component
export const HistorialTable = ({
  listMatriculas,
}: {
  listMatriculas: IEnrollmentList[]
}) => (
  <>
    {listMatriculas.length > 0 && (
      <div className="rounded-lg overflow-hidden flex flex-col gap-5">
        <div className="overflow-x-auto rounded-md">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Período
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo de Matrícula
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Programa
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cursos
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Créditos
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ficha
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {listMatriculas.map((record) => (
                <tr
                  key={record.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                    {record.fecha}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                    {record.period_name}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                    {record.enrollment_type}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                    {record.program}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                    {record.courses}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                    {record.credits}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm">
                    <Link
                      href={APP_URL.MATRICULA.MATRICULAS_LIST.DETAIL(
                        record.id.toString()
                      )}
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      Ver detalle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
    {listMatriculas.length === 0 && (
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
  </>
)
