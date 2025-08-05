'use client'

import { CheckCircle, CreditCard, Info, InfoIcon, Receipt } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { AcademicConcept } from '@/types'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

export interface AcademicPayment {
  id: number
  uuid: string
  student_file_uuid: string | null
  client_name: string
  document_number: string
  operation_number: string
  date: string // ISO date string
  amount: string
  is_active: boolean
  is_conciliate: boolean
  conciliate_number: string | null
  paid_file: string | null
  is_imported: boolean
  is_validated: boolean
  observation: string | null
  created_at: string // ISO date string
  updated_at: string // ISO date string
  concept: number
}

const AMOUNT_EXTEMPORARY = 251

interface PaymentListProps {
  paymentsList: AcademicPayment[]
  concepData?: AcademicConcept
}

export const PaymentHistory = ({
  paymentsList = [],
  concepData,
}: PaymentListProps) => {
  // Calcular estadísticas basadas en los datos reales
  const totalAmount = paymentsList.reduce((sum, payment) => {
    return sum + Number.parseFloat(payment.amount)
  }, 0)

  const activePayments = paymentsList.filter((payment) => payment.is_active)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const formatAmount = (amount: string) => {
    return `S/ ${Number.parseFloat(amount).toFixed(2)}`
  }

  // const getPaymentStatus = (payment: AcademicPayment) => {
  //   if (!payment.is_active)
  //     return {
  //       label: 'Inactivo',
  //       variant: 'destructive' as const,
  //       color: 'bg-red-100 text-red-800',
  //     }
  //   if (payment.is_validated && payment.is_conciliate)
  //     return {
  //       label: 'Validado',
  //       variant: 'default' as const,
  //       color: 'bg-green-100 text-green-800',
  //     }
  //   if (payment.is_conciliate)
  //     return {
  //       label: 'Conciliado',
  //       variant: 'secondary' as const,
  //       color: 'bg-blue-100 text-blue-800',
  //     }
  //   if (payment.is_imported)
  //     return {
  //       label: 'Importado',
  //       variant: 'outline' as const,
  //       color: 'bg-yellow-100 text-yellow-800',
  //     }
  //   return {
  //     label: 'Pendiente',
  //     variant: 'secondary' as const,
  //     color: 'bg-orange-100 text-orange-800',
  //   }
  // }

  return (
    <>
      <div className="w-full space-y-6">
        {/* Summary section */}
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Banner explicativo */}
          <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 border-l-4 border-l-blue-500">
            <Info className="h-5 w-5 text-blue-600" />
            <AlertTitle className="text-blue-900 font-medium">
              <span className="block font-bold mb-1">
                Información sobre Pagos de Matrícula
              </span>
            </AlertTitle>
            <AlertDescription className="text-blue-900 font-medium">
              Esta sección muestra únicamente los pagos de matrícula académica
              que has realizado exitosamente. Incluye matrículas regulares,
              extemporáneas y conceptos relacionados con tu proceso de
              inscripción.
            </AlertDescription>
          </Alert>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total de Pagos Activos */}
            <Card className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
              <CardContent className="px-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="h-4 w-4 text-green-600" />
                      <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                        Total Invertido
                      </p>
                    </div>
                    <p className="text-2xl font-extrabold text-gray-900 mb-1">
                      S/ {totalAmount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Suma total de todos los pagos de matrícula realizados
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Card 2 - Cantidad de Pagos */}
            <Card className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
              <CardContent className="px-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Receipt className="h-4 w-4 text-blue-600" />
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                        Transacciones
                      </p>
                    </div>
                    <p className="text-2xl font-extrabold text-gray-900 mb-1">
                      {activePayments.length}
                    </p>
                    <p className="text-sm text-gray-600">
                      Número total de pagos de matrícula procesados
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Receipt className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Card 3 - Conceptos de Pago dinámicos */}
            {concepData &&
              (() => {
                const conceptPayments = paymentsList.filter(
                  (payment) => payment.concept === concepData.id
                )
                return (
                  <Card className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                    <CardContent className="px-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <InfoIcon className="h-4 w-4 text-indigo-600" />
                            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                              {concepData.name}
                            </p>
                          </div>
                          <p className="text-2xl font-extrabold text-gray-900 mb-1">
                            S/ {concepData.price}
                          </p>
                          <p className="text-sm text-gray-600">
                            {conceptPayments.length} pago
                            {conceptPayments.length !== 1 ? 's' : ''} realizado
                            {conceptPayments.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-xs"
                        >
                          Código {concepData.code}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )
              })()}
          </div>
        </div>

        {/* Payment Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">
              Transacciones Detalladas
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Aquí puedes ver el historial de tus pagos, incluyendo detalles
              como el número de documento, fecha, concepto y estado del pago.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200 bg-gray-50">
                    <TableHead className="font-semibold text-gray-700 px-6 py-4">
                      N° Documento
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 px-6 py-4">
                      N° Operación
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 px-6 py-4">
                      Fecha
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 px-6 py-4">
                      Concepto
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 px-6 py-4">
                      Monto
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 px-6 py-4">
                      Tipo. Matrícula
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 px-6 py-4">
                      Deuda
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 px-6 py-4">
                      Estado
                    </TableHead>
                    {/* <TableHead className="font-semibold text-gray-700 px-6 py-4 text-right">
                      Acciones
                    </TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentsList.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center py-8 text-gray-500"
                      >
                        No hay pagos registrados
                      </TableCell>
                    </TableRow>
                  ) : (
                    paymentsList.map((payment) => {
                      // const status = getPaymentStatus(payment)
                      return (
                        <TableRow
                          key={payment.uuid}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <TableCell className="px-6 py-4">
                            <span className="font-mono text-sm text-gray-700">
                              {payment.document_number}
                            </span>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <span className="font-mono text-sm font-medium text-gray-900">
                              {payment.operation_number}
                            </span>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <span className="text-sm text-gray-700">
                              {formatDate(payment.date)}
                            </span>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <span className="text-sm text-gray-900">
                              {concepData?.name || 'Sin concepto'}
                            </span>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <span className="font-semibold text-gray-900">
                              {formatAmount(payment.amount)}
                            </span>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <Badge className="text-sm text-gray-700 rounded-full bg-gray-100">
                              {Number(payment.amount) === AMOUNT_EXTEMPORARY
                                ? 'Extemporánea'
                                : 'Regular'}
                            </Badge>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <span
                              className={cn(
                                'text-sm font-semibold',
                                Number(payment.amount) === 0
                                  ? 'text-red-600'
                                  : 'text-green-600'
                              )}
                            >
                              {Number(payment.amount) === 0
                                ? 'Pendiente'
                                : 'Sin deuda'}
                            </span>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            {/* <Badge
                              variant={status.variant}
                              className={status.color}
                            >
                              {status.label}
                            </Badge> */}
                            <Badge
                              className={cn(
                                'text-xs rounded-full',
                                payment.is_active
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              )}
                            >
                              {payment.is_active ? 'Completado' : 'Inactivo'}
                            </Badge>
                          </TableCell>
                          {/* <TableCell className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {payment.paid_file && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell> */}
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
