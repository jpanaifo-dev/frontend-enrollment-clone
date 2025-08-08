/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { AlertTriangle, ShieldCheck, TrashIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { RadioGroup } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CoursesData, IEnrollmentStage, IStudentDetails } from '@/types'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EnrollmentGroupCard, StudentInfoCard } from '../components'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { EnrollmentData } from './enrollmentData'
import { Steps } from './steps'
import { createEnrollment } from '@/api/admission/enrollment-save'
import { IEnrollmentStageCreate, enrollmentSchemaCreate } from '../schema'
import { toast } from 'react-toastify'
import { LoadingAbsolute, ToastCustom } from '@/components/app'
import { useRouter } from 'next/navigation'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { APP_URL } from '@/config/urls-data/student.urls.config'
import { colors, days, hours } from './enrollment.utils'
import { isValidDateString } from './utils'

const steps = [
  { title: 'Comenzar Matrcula' },
  { title: 'Seleccion de grupos' },
  { title: 'Confirmar matrícula' },
]

// Definición de tipos
interface ScheduleItem {
  id: string
  day: string
  start_time: string
  end_time: string
  room_name: string
}

interface SelectedCourse {
  id?: string
  code: string
  name: string
  group: string
  credits: number
  teacher: string
  schedule: ScheduleItem[]
}

interface EnrollmentProps {
  coursesData: CoursesData
  enrollmentStage?: IEnrollmentStage
  paymentUuid?: string
  studentUuid?: string
  studentInfo?: IStudentDetails
}

export const EnrollmentForm = ({
  coursesData,
  studentInfo,
  enrollmentStage,
  studentUuid,
  paymentUuid,
}: EnrollmentProps) => {
  const [stepType, setStepType] = useState<'form' | 'summary'>('form')
  const [selectedCourses, setSelectedCourses] = useState<SelectedCourse[]>([])
  const [totalCredits, setTotalCredits] = useState(0)
  const [massSelection, setMassSelection] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const [selectedDateRange, setSelectedDateRange] = useState<string>('')
  // dateRanges.length > 0 ? dateRanges[0].label : null
  const router = useRouter()

  // Calcular los grupos comunes a todos los cursos
  const commonGroups = useMemo(() => {
    if (!coursesData || coursesData?.length === 0) return []

    // Obtener todos los grupos únicos del primer curso
    const firstCourseGroups = new Set(
      coursesData[0]?.groups.map((g) => g.group)
    )

    // Filtrar los grupos que están presentes en todos los cursos
    for (let i = 1; i < coursesData.length; i++) {
      const currentGroups = new Set(coursesData[i]?.groups?.map((g) => g.group))
      for (const group of firstCourseGroups) {
        if (!currentGroups.has(group)) {
          firstCourseGroups.delete(group)
        }
      }
    }

    return Array.from(firstCourseGroups).sort()
  }, [coursesData])

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IEnrollmentStageCreate>({
    resolver: zodResolver(enrollmentSchemaCreate),
    defaultValues: {
      student_file_uuid: studentUuid || '',
      // period_uuid: enrollmentStage?.period_uuid || '',
      payment_uuid: paymentUuid || '',
      enrollment_stage_id: enrollmentStage?.id.toString() || '',
      courses: coursesData.map(() => ({
        course_group_id: '',
      })),
    },
  })

  const formValues = watch()

  // Función para manejar la selección masiva
  const handleMassSelection = (groupLetter: string) => {
    setMassSelection(groupLetter)

    const newCourses = formValues.courses.map((course, index) => {
      const courseGroup = coursesData[index]
      const matchingGroup = courseGroup?.groups.find(
        (g) => g.group === groupLetter && g.students_enrolled < g.max_students // Solo seleccionar si hay cupos disponibles
      )

      return {
        course_group_id: matchingGroup ? matchingGroup.id.toString() : '',
      }
    })

    setValue('courses', newCourses)
  }

  // Función para manejar el envío del formulario
  const onSubmit = (data: IEnrollmentStageCreate) => {
    const courses: SelectedCourse[] = []
    let creditsTotal = 0

    // Validar que se hayan seleccionado todos los grupos
    const hasEmptySelections = data.courses.some(
      (course) => !course.course_group_id
    )

    if (hasEmptySelections) {
      toast.error(
        <ToastCustom
          title="Selección incompleta"
          description="Debes seleccionar un grupo para todos los cursos antes de continuar."
        />
      )
      return
    }

    data.courses.forEach((selection, index) => {
      if (selection.course_group_id) {
        const courseGroup = coursesData[index]
        const group = courseGroup?.groups.find(
          (g) => g.id === Number(selection.course_group_id)
        )

        if (courseGroup && group) {
          courses.push({
            code: courseGroup.course.code,
            name: courseGroup.course.name,
            group: group.group,
            credits: Number(courseGroup.course.credits),
            teacher: group.teacher,
            schedule: group.schedule.map((s) => ({
              ...s,
              id: String(s.id),
            })),
          })
          creditsTotal += Number(courseGroup.course.credits)
        }
      }
    })

    setSelectedCourses(courses)
    setTotalCredits(creditsTotal)
    setStepType('summary')
  }

  // Función para confirmar la matrícula
  const handleConfirmEnrollment = async () => {
    // Validación adicional (por si acaso)
    const hasEmptySelections = formValues.courses.some(
      (course) => !course.course_group_id
    )

    if (hasEmptySelections) {
      toast.error(
        <ToastCustom
          title="Selección incompleta"
          description="Debes seleccionar un grupo para todos los cursos antes de confirmar."
        />
      )
      return
    }
    setShowConfirmationDialog(true)
  }

  const handleConfirmDialog = async () => {
    setShowConfirmationDialog(false)
    setIsSubmitting(true)
    try {
      const enrollmentData: IEnrollmentStageCreate = {
        student_file_uuid: formValues.student_file_uuid,
        period_uuid: formValues.period_uuid,
        payment_uuid: formValues.payment_uuid,
        enrollment_stage_id: formValues.enrollment_stage_id,
        courses: formValues.courses
          .filter((course) => course.course_group_id !== '')
          .map((course) => ({
            course_group_id: course.course_group_id,
          })),
      }

      const response = await createEnrollment(enrollmentData)
      // Aquí puedes agregar redirección o notificación de éxito
      if (response.status === 200 || response.status === 201) {
        toast.success(
          <ToastCustom
            title="Matrícula creada con éxito"
            description="Tu matrícula ha sido procesada correctamente."
          />
        )
        // Redirigir o realizar otra acción
        router.push(
          APP_URL.MATRICULA.MATRICULAS_LIST.DETAIL(
            String(response?.data?.enrollment_id)
          )
        )
      } else {
        toast.error(
          <ToastCustom
            title="Error al crear matrícula"
            description={`Error al crear la matrícula: ${
              response.errors?.join(', ') || 'Error desconocido'
            }`}
          />
        )
      }
    } catch (error) {
      console.error('Error al crear la matrícula:', error)
      alert('Ocurrió un error al procesar la matrícula')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Devuelve un array de objetos con el curso y el grupo seleccionado (incluyendo fechas)
  const getSelectedGroupsWithDates = useMemo(() => {
    return formValues.courses
      .map((course, index) => {
        if (!course.course_group_id) return null
        const courseGroup = coursesData[index]
        const group = courseGroup?.groups.find(
          (g) => g.id === Number(course.course_group_id)
        )
        if (!group) return null
        return {
          course: courseGroup.course,
          group,
        }
      })
      .filter(Boolean) // Filtramos los nulos
  }, [formValues.courses, coursesData])

  // Obtener rangos de fechas únicos de los grupos seleccionados
  const dateRanges = useMemo(() => {
    const ranges = new Map<
      string,
      { start_date: string; end_date: string; id: string }
    >()

    getSelectedGroupsWithDates.forEach((item) => {
      if (item && item.group) {
        // Validar que ambas fechas no estén vacías y tengan formato de fecha válido
        const isStartDateValid = isValidDateString(item.group.start_date)
        const isEndDateValid = isValidDateString(item.group.end_date)
        // Crear un id temporal único para el rango de fechas y grupo
        const tempId = `${item.course.code}-${item.group.group}-${item.group.start_date}-${item.group.end_date}`

        if (isStartDateValid && isEndDateValid) {
          const key = `${item.group.start_date} - ${item.group.end_date}`
          ranges.set(key, {
            id: tempId,
            start_date: item.group.start_date,
            end_date: item.group.end_date,
          })
        }
      }
    })

    return Array.from(ranges.entries()).map(([label, dates]) => ({
      label,
      ...dates,
    }))
  }, [getSelectedGroupsWithDates])

  // Filtrar grupos por el rango de fechas seleccionado
  const filteredGroupsByDate = useMemo(() => {
    if (!selectedDateRange) return getSelectedGroupsWithDates

    const selectedRange = dateRanges.find(
      (range) => range.id === selectedDateRange
    )

    if (!selectedRange) return getSelectedGroupsWithDates

    return getSelectedGroupsWithDates.filter((group) => {
      if (!group) return false

      return (
        group.group.start_date === selectedRange.start_date &&
        group.group.end_date === selectedRange.end_date
      )
    })
  }, [getSelectedGroupsWithDates, selectedDateRange, dateRanges])

  // Efecto para establecer el rango de fechas seleccionado por defecto
  useEffect(() => {
    if (dateRanges.length > 0 && !selectedDateRange) {
      setSelectedDateRange(dateRanges[0].id)
    }
  }, [dateRanges, watch('courses')])

  // Función para generar el horario
  const generateSchedule = () => {
    if (!selectedDateRange) {
      return (
        <TableRow>
          <TableCell
            colSpan={7}
            className="text-center py-8 text-gray-500"
          >
            Seleccione un rango de fechas para ver el horario
          </TableCell>
        </TableRow>
      )
    }

    if (filteredGroupsByDate.length === 0) {
      return (
        <TableRow>
          <TableCell
            colSpan={7}
            className="text-center py-8 text-gray-500"
          >
            No hay horarios disponibles para el rango de fechas seleccionado
          </TableCell>
        </TableRow>
      )
    }

    return hours.map((hour) => {
      const currentHour = parseInt(hour.split(':')[0], 10)

      return (
        <TableRow key={hour}>
          <TableCell className="border font-medium">{hour}</TableCell>
          {days.map((day) => {
            // Buscar los cursos del rango de fecha filtrado
            const coursesAtThisTime = filteredGroupsByDate.flatMap((item) => {
              return item?.group.schedule
                .filter((s) => s.day === day)
                .filter((s) => {
                  const startHour = parseInt(s.start_time.split(':')[0], 10)
                  const endHour = parseInt(s.end_time.split(':')[0], 10)
                  return currentHour >= startHour && currentHour < endHour
                })
                .map((s) => ({
                  code: item.course.code,
                  name: item.course.name,
                  group: item.group.group,
                  scheduleItem: s,
                }))
            })

            if (coursesAtThisTime.length === 0) {
              return (
                <TableCell
                  key={day}
                  className="border"
                />
              )
            }

            return (
              <TableCell
                key={day}
                className="border p-0"
              >
                <div className="flex flex-col h-full">
                  {coursesAtThisTime.map((course, index) => {
                    const colorIndex =
                      filteredGroupsByDate?.findIndex(
                        (g) =>
                          g?.course.code === course?.code &&
                          g?.group.group === course?.group
                      ) % colors.length
                    const color = colors[colorIndex]

                    return (
                      <div
                        key={`${day}-${hour}-${index}`}
                        className={`${color} p-2 flex-1 border-b last:border-b-0`}
                      >
                        <p className="text-xs font-semibold">{course?.name}</p>
                        <p className="text-xs font-medium">
                          Grupo {course?.group}
                        </p>
                        <p className="text-xs">
                          Aula: {course?.scheduleItem.room_name}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </TableCell>
            )
          })}
        </TableRow>
      )
    })
  }

  return (
    <div className="bg-slate-100">
      <div className="sticky top-0 z-10">
        <div className="bg-slate-50">
          <div className="max-w-4xl mx-auto p-6">
            <Steps
              currentStep={stepType === 'form' ? 2 : 3}
              steps={steps}
            />
          </div>
        </div>
        <hr className="text-gray-500" />
        {enrollmentStage && (
          <div className="bg-white ">
            <main className="container mx-auto">
              <EnrollmentData enrollmentData={enrollmentStage} />
            </main>
          </div>
        )}
        <hr className="text-gray-500" />
      </div>
      {stepType === 'form' && (
        <div className="container mx-auto py-8 px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Información del alumno */}
            {studentInfo && <StudentInfoCard studentInfo={studentInfo} />}

            {/* Selección de cursos */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6 flex flex-col gap-4 md:gap-6">
                  <Alert className="bg-amber-50">
                    <ShieldCheck className="h-6 w-6" />
                    <AlertTitle className="text-yellow-900">
                      Instrucciones para la matrícula
                    </AlertTitle>
                    <AlertDescription className="text-yellow-800">
                      Selecciona un grupo para cada curso que deseas matricular.
                      Puedes usar la opción de selección masiva para asignar el
                      mismo grupo a todos los cursos rápidamente. Revisa
                      cuidadosamente tus elecciones antes de continuar.
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-between items-end gap-4 mb-6">
                    <h3 className="text-gray-700 font-medium text-sm">
                      Selección de grupos para matrícula
                    </h3>
                    <div className="flex items-center gap-3">
                      <label
                        htmlFor="mass-selection"
                        className="text-sm font-medium text-gray-600"
                      >
                        Asignación masiva:
                      </label>
                      <Select
                        value={massSelection}
                        onValueChange={(value) => {
                          if (value === 'none') {
                            setMassSelection('')
                            const newCourses = formValues.courses.map(() => ({
                              course_group_id: '',
                            }))
                            setValue('courses', newCourses)
                          } else {
                            handleMassSelection(value)
                          }
                        }}
                      >
                        <SelectTrigger
                          id="mass-selection"
                          className="w-[220px] bg-white shadow-sm hover:bg-gray-50 transition-colors"
                        >
                          <SelectValue placeholder="Seleccionar grupo" />
                        </SelectTrigger>
                        <SelectContent className="border border-gray-200 shadow-lg">
                          <SelectGroup>
                            <SelectLabel className="text-xs font-semibold text-gray-500">
                              Opciones de asignación
                            </SelectLabel>
                            <SelectItem
                              value="none"
                              className="focus:bg-red-50 focus:text-red-600"
                            >
                              <span className="flex items-center gap-2">
                                <TrashIcon className="w-4 h-4" />
                                Limpiar selección
                              </span>
                            </SelectItem>
                            {commonGroups.map((group) => (
                              <SelectItem
                                key={group}
                                value={group}
                                className="hover:bg-blue-50 focus:bg-blue-50"
                              >
                                <span className="flex items-center gap-2">
                                  Asignar grupo {group} a todos
                                </span>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {coursesData.map((courseGroup, index) => {
                    const selection = formValues.courses[index]
                    const error = errors.courses?.[index]?.course_group_id

                    return (
                      <div key={courseGroup.course_uuid}>
                        <h3 className="text-lg font-bold mb-2">
                          {courseGroup.course.name}
                        </h3>
                        <div className="flex gap-2 text-sm text-gray-800 mb-4 font-medium">
                          <span>Código: {courseGroup.course.code}</span>
                          <span>|</span>
                          <span>Créditos: {courseGroup.course.credits}</span>
                          <span>|</span>
                          <span>
                            Cíclo: {courseGroup.course.academic_cycle}
                          </span>
                        </div>

                        {error && (
                          <p className="text-red-500 text-sm mb-2">
                            {error.message}
                          </p>
                        )}

                        <RadioGroup
                          value={selection?.course_group_id || ''}
                          onValueChange={(value) => {
                            const newCourses = [...formValues.courses]
                            newCourses[index] = {
                              ...newCourses[index],
                              course_group_id: value,
                            }
                            setValue('courses', newCourses, {
                              shouldValidate: true,
                            })
                            setMassSelection('')
                          }}
                        >
                          {courseGroup.groups.map((group) => (
                            <EnrollmentGroupCard
                              key={group.id}
                              group={group}
                              disabled={
                                group.students_enrolled >= group.max_students
                              }
                              isSelected={
                                selection?.course_group_id ===
                                group.id.toString()
                              }
                            />
                          ))}
                        </RadioGroup>
                      </div>
                    )
                  })}
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size="lg"
                  >
                    Continuar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {stepType === 'summary' && (
        <div className="container mx-auto py-8 px-4 max-w-6xl">
          <div className="space-y-6">
            {/* Resumen de matrícula */}
            <Card className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <p className="text-gray-500">Alumno</p>
                  <p className="font-medium">{studentInfo?.person_name}</p>
                </div>
                <div>
                  <p className="text-gray-500">Código de alumno</p>
                  <p className="font-medium">{studentInfo?.university_code}</p>
                </div>
                <div>
                  <p className="text-gray-500">Programa</p>
                  <p className="font-medium">{studentInfo?.program_name}</p>
                </div>
                <div>
                  <p className="text-gray-500">Fecha de matrícula</p>
                  <p className="font-medium">
                    {new Date().toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <h3 className="font-bold mb-3">Cursos a matricular</h3>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Código</TableHead>
                    <TableHead>Curso</TableHead>
                    <TableHead className="w-[80px]">Grupo</TableHead>
                    <TableHead className="w-[80px] text-right">
                      Créditos
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedCourses.map((course, index) => (
                    <TableRow key={index}>
                      <TableCell>{course.code}</TableCell>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.group}</TableCell>
                      <TableCell className="text-right">
                        {course.credits}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableRow className="bg-gray-50">
                  <TableCell
                    colSpan={2}
                    className="font-medium"
                  >
                    Total de cursos: {selectedCourses.length} Cursos
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    className="text-right font-medium"
                  >
                    Total de créditos: {totalCredits} Créditos
                  </TableCell>
                </TableRow>
              </Table>
            </Card>

            {/* Vista Previa del Horario */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold mb-1">
                    Vista Previa del Horario
                  </h2>
                  <p className="text-sm text-gray-600">
                    Así quedará tu horario con los cursos seleccionados
                  </p>
                </div>
                {dateRanges.length > 0 && (
                  <Select
                    value={selectedDateRange}
                    onValueChange={setSelectedDateRange}
                  >
                    <SelectTrigger className="w-[220px]">
                      <SelectValue placeholder="Seleccionar rango de fechas" />
                    </SelectTrigger>
                    <SelectContent>
                      {dateRanges.map((range) => (
                        <SelectItem
                          key={range?.id}
                          value={range.id}
                        >
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="overflow-x-auto">
                <Table className="border-collapse">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px] border">Hora</TableHead>
                      <TableHead className="border text-center">
                        Lunes
                      </TableHead>
                      <TableHead className="border text-center">
                        Martes
                      </TableHead>
                      <TableHead className="border text-center">
                        Miércoles
                      </TableHead>
                      <TableHead className="border text-center">
                        Jueves
                      </TableHead>
                      <TableHead className="border text-center">
                        Viernes
                      </TableHead>
                      <TableHead className="border text-center">
                        Sábado
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>{generateSchedule()}</TableBody>
                </Table>
              </div>
            </Card>

            {/* Mensaje de advertencia */}
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800 mb-1">Importante</p>
                <p className="text-sm text-amber-700">
                  Antes de confirmar tu matrícula, asegúrate de revisar
                  cuidadosamente toda la información registrada. Una vez
                  finalizado el proceso, cualquier modificación o cambio deberá
                  gestionarse de manera presencial en la Oficina de Asuntos
                  Académicos.
                </p>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setStepType('form')}
                size="lg"
              >
                Volver
              </Button>
              <Button
                onClick={handleConfirmEnrollment}
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? 'Procesando...' : 'Confirmar'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Diálogo de confirmación */}
      <AlertDialog
        open={showConfirmationDialog}
        onOpenChange={setShowConfirmationDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Confirmar matrícula?</AlertDialogTitle>
            <AlertDialogDescription>
              Estás a punto de confirmar tu matrícula con los siguientes
              detalles:
              <div>
                <span className="block mt-2">
                  <span className="block">
                    {selectedCourses.length} cursos seleccionados
                  </span>
                  <span className="block">
                    Total de créditos: {totalCredits}
                  </span>
                </span>
                <span className="mt-2 font-medium">
                  ¿Estás seguro que deseas continuar?
                </span>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDialog}
              disabled={isSubmitting}
              className="bg-[#003366] hover:bg-[#002244]"
            >
              {isSubmitting ? 'Procesando...' : 'Confirmar Matrícula'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Loading absolute*/}
      <LoadingAbsolute
        show={isSubmitting}
        label="Generando matícula"
      />
    </div>
  )
}
