/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Calendar,
  Download,
  PrinterIcon as Print,
  Share2,
  Clock,
  MapPin,
  User,
  BookOpen,
  CalendarPlus,
  Building,
  ArrowLeft,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Alert, AlertDescription } from '@/components/ui/alert'
import type { StudentData } from '@/types'
import Link from 'next/link'
import { APP_URL } from '@/config/urls-data/student.urls.config'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import { useParams } from 'next/navigation'
import { getUserServiceUrl } from '@/lib/get-url-base'
import { isValidDateString } from './utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { days, hours } from './enrollment.utils'

const URL_PATH = ENDPOINTS_CONFIG.DOWNLOAD.DOWNLOAD_CERTIFICATE
const urlBase = getUserServiceUrl()
const URL_DOWNLOAD = `${urlBase}${URL_PATH}`

interface StudentDetailsProps {
  data: StudentData
}

export const StudentDetailsComponent = ({ data }: StudentDetailsProps) => {
  const [activeTab, setActiveTab] = useState('courses')
  const [selectedDateRange, setSelectedDateRange] = useState<string>('')
  const params = useParams()
  const enrollmentId = params.uuid as string

  // Obtener rangos de fechas únicos de los grupos
  const dateRanges = useMemo(() => {
    const ranges = new Map<
      string,
      { start_date: string; end_date: string; id: string }
    >()

    data.courses.forEach((course) => {
      course.groups.forEach((group) => {
        // Validar que ambas fechas no estén vacías y tengan formato de fecha válido
        const isStartDateValid = isValidDateString(group.start_date)
        const isEndDateValid = isValidDateString(group.end_date)

        // Crear un id temporal único para el rango de fechas y grupo
        const tempId = `${course.course.code}-${group.group}-${group.start_date}-${group.end_date}`

        if (isStartDateValid && isEndDateValid) {
          const key = `${group.start_date} - ${group.end_date}`
          ranges.set(key, {
            id: tempId,
            start_date: group.start_date,
            end_date: group.end_date,
          })
        }
      })
    })

    return Array.from(ranges.entries()).map(([label, dates]) => ({
      label,
      ...dates,
    }))
  }, [data.courses])

  // Filtrar grupos por el rango de fechas seleccionado
  const filteredGroupsByDate = useMemo(() => {
    if (!selectedDateRange || dateRanges.length === 0) return data.courses

    const selectedRange = dateRanges.find(
      (range) => range.id === selectedDateRange
    )

    if (!selectedRange) return data.courses

    return data.courses
      .map((course) => ({
        ...course,
        groups: course.groups.filter(
          (group) =>
            group.start_date === selectedRange.start_date &&
            group.end_date === selectedRange.end_date
        ),
      }))
      .filter((course) => course.groups.length > 0)
  }, [data.courses, selectedDateRange, dateRanges])

  // Efecto para establecer el rango de fechas seleccionado por defecto
  useEffect(() => {
    if (dateRanges.length > 0 && !selectedDateRange) {
      setSelectedDateRange(dateRanges[0].id)
    }
  }, [dateRanges])

  if (!data.student_details) {
    return (
      <div className="container mx-auto p-6 max-w-7xl">
        <Alert>
          <AlertDescription>
            No se encontraron datos del alumno.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const student = data.student_details
  const programDetails = data.program_details || null
  const totalCredits = data.courses.reduce(
    (sum, course) => sum + Number.parseInt(course.course.credits),
    0
  )

  // Función para imprimir
  const printRecord = () => {
    window.print()
  }

  // Función para compartir
  const shareRecord = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ficha de Matrícula',
          text: `Ficha de matrícula de ${student.names} - ${student.university_code}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(window.location.href)
      alert('Enlace copiado al portapapeles')
    }
  }

  // Función para sincronizar con Google Calendar
  const syncWithGoogleCalendar = () => {
    const events: Array<{
      title: string
      description: string
      location: string
      startTime: string
      endTime: string
      day: string
    }> = []

    data.courses.forEach((course) => {
      course.groups.forEach((group) => {
        group.schedule.forEach((schedule) => {
          const event = {
            title: `${course.course.name} - ${course.course.code}`,
            description: `Docente: ${group.teacher}\nAula: ${schedule.room_name}\nGrupo: ${group.group}`,
            location: schedule.room_name,
            startTime: schedule.start_time,
            endTime: schedule.end_time,
            day: schedule.day,
          }
          events.push(event)
        })
      })
    })

    // Generar URL de Google Calendar
    const baseUrl =
      'https://calendar.google.com/calendar/render?action=TEMPLATE'
    events.forEach((event) => {
      const params = new URLSearchParams({
        text: event.title,
        details: event.description,
        location: event.location,
        dates: `20250610T${event.startTime.replace(
          ':',
          ''
        )}00/20250610T${event.endTime.replace(':', '')}00`,
        recur: 'RRULE:FREQ=WEEKLY;UNTIL=20250704T235959Z',
      })
      window.open(`${baseUrl}&${params.toString()}`, '_blank')
    })
  }

  // Nueva función para generar el horario agrupado con filtrado por fecha
  const generateGroupedSchedule = () => {
    const scheduleByDayAndHour: Record<
      string,
      Record<
        string,
        Array<{
          course: string
          code: string
          teacher: string
          room: string
          color: string
          group: string
          startTime: string
          endTime: string
        }>
      >
    > = {}

    // Inicializar estructura
    days.forEach((day) => {
      scheduleByDayAndHour[day] = {}
      hours.forEach((time) => {
        scheduleByDayAndHour[day][time] = []
      })
    })

    // Llenar con datos de cursos filtrados
    filteredGroupsByDate.forEach((course) => {
      course.groups.forEach((group) => {
        group.schedule.forEach((scheduleItem) => {
          const day = scheduleItem.day
          const startHour = parseInt(scheduleItem.start_time.split(':')[0], 10)
          const endHour = parseInt(scheduleItem.end_time.split(':')[0], 10)

          // Generar color basado en código de curso + grupo para consistencia
          const color = `hsl(${
            Math.abs(
              (course.course.code + group.group)
                .split('')
                .reduce((a, b) => a + b.charCodeAt(0), 0)
            ) % 360
          }, 70%, 85%)`

          for (let hour = startHour; hour < endHour; hour++) {
            const timeKey = `${hour.toString().padStart(2, '0')}:00`
            if (
              scheduleByDayAndHour[day] &&
              scheduleByDayAndHour[day][timeKey]
            ) {
              scheduleByDayAndHour[day][timeKey].push({
                course: course.course.name,
                code: course.course.code,
                teacher: group.teacher,
                room: scheduleItem.room_name,
                color,
                group: group.group,
                startTime: scheduleItem.start_time,
                endTime: scheduleItem.end_time,
              })
            }
          }
        })
      })
    })

    return scheduleByDayAndHour
  }

  const groupedSchedule = generateGroupedSchedule()

  // Función para renderizar el horario agrupado
  const renderGroupedSchedule = () => {
    if (dateRanges.length === 0) {
      return (
        <TableRow>
          <TableCell
            colSpan={8}
            className="text-center py-8 text-gray-500"
          >
            No hay horarios disponibles
          </TableCell>
        </TableRow>
      )
    }

    if (filteredGroupsByDate.length === 0) {
      return (
        <TableRow>
          <TableCell
            colSpan={8}
            className="text-center py-8 text-gray-500"
          >
            No hay horarios disponibles para el rango de fechas seleccionado
          </TableCell>
        </TableRow>
      )
    }

    return hours.map((time) => {
      const currentHour = parseInt(time.split(':')[0], 10)

      return (
        <TableRow key={time}>
          <TableCell className="font-medium text-sm border">{time}</TableCell>
          {days.map((day) => {
            const coursesAtThisTime = groupedSchedule[day]?.[time] || []

            if (coursesAtThisTime.length === 0) {
              return (
                <TableCell
                  key={`${day}-${time}`}
                  className="border"
                />
              )
            }

            return (
              <TableCell
                key={`${day}-${time}`}
                className="border p-0"
              >
                <div className="flex flex-col h-full">
                  {coursesAtThisTime.map((course, index) => {
                    // Solo mostrar si es la hora de inicio del bloque
                    const startHour = parseInt(
                      course.startTime.split(':')[0],
                      10
                    )
                    if (currentHour !== startHour) return null

                    // Calcular rowSpan basado en la duración
                    const duration =
                      parseInt(course.endTime.split(':')[0], 10) -
                      parseInt(course.startTime.split(':')[0], 10)

                    return (
                      <div
                        key={`${day}-${time}-${index}`}
                        className={`p-2 flex-1 border-b last:border-b-0`}
                        style={{
                          backgroundColor: course.color,
                          borderLeft: `4px solid ${course.color.replace(
                            '85%',
                            '50%'
                          )}`,
                          gridRow: `span ${duration}`,
                          height: `${duration * 100}%`,
                        }}
                      >
                        <p className="text-xs font-semibold">{course.course}</p>
                        <p className="text-xs font-medium">
                          Grupo {course.group}
                        </p>
                        <p className="text-xs">Aula: {course.room}</p>
                        <p className="text-xs">
                          {course.startTime} - {course.endTime}
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
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 sticky top-20 bg-white py-4 z-10 border-b border-gray-200">
        <div className="container mx-auto p-6 max-w-7xl flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4 mb-4 lg:mb-0">
            <Button
              size="icon"
              variant="outline"
              asChild
            >
              <Link href={APP_URL.MATRICULA.LIST}>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Detalles de Matrícula
              </h1>
              <p className="text-gray-600">
                Información detallada de la matrícula del alumno
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 lg:mt-0">
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <Link
                href={`${URL_DOWNLOAD}?enrollment_id=${enrollmentId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar Ficha
              </Link>
            </Button>
            <Button
              onClick={printRecord}
              variant="outline"
              size="sm"
            >
              <Print className="w-4 h-4 mr-2" />
              Imprimir
            </Button>
            <Button
              onClick={shareRecord}
              variant="outline"
              size="sm"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartir
            </Button>
            <Button
              onClick={syncWithGoogleCalendar}
              variant="default"
              size="sm"
            >
              <CalendarPlus className="w-4 h-4 mr-2" />
              Sync Google Calendar
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 max-w-7xl">
        <div className="bg-white border border-gray-200 rounded-md mb-6 overflow-hidden ">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[200px]">
            {/* Información Institucional */}
            <div className="p-6 bg-gray-50 border-r border-gray-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-md">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Información del programa
                  </h2>
                  <p className="text-sm text-gray-600">
                    Datos del programa académico
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Programa Académico
                  </label>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {programDetails?.program_name}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Código del Programa
                  </label>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    #{programDetails?.program_code}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Facultad
                  </label>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {programDetails?.unity_name}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Modalidad
                  </label>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {programDetails?.modality_name}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Ciclo Académico
                  </label>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {data?.courses?.length > 0
                      ? data.courses[0]?.course.academic_cycle
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Información del alumno */}
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-md">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Información del alumno
                  </h2>
                  <p className="text-sm text-gray-600">
                    Datos personales y académicos
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Nombre Completo
                  </label>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {student?.names} {student?.last_name1} {student?.last_name2}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Código Universitario
                  </label>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {student?.university_code}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Cursos Matriculados
                  </label>
                  <p className="text-sm font-semibold text-blue-600 mt-1">
                    {data?.courses?.length} cursos
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Total de Créditos
                  </label>
                  <p className="text-sm font-semibold text-green-600 mt-1">
                    {totalCredits} créditos
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Fecha de Matrícula
                  </label>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {new Date().toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="courses">Cursos</TabsTrigger>
            <TabsTrigger value="schedule">Horario</TabsTrigger>
          </TabsList>

          {/* Cursos */}
          <TabsContent
            value="courses"
            className="space-y-6"
          >
            <Card className="border-0 rounded-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Cursos Matriculados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.courses.map((course) => (
                    <Card
                      key={course.course_uuid}
                      className="border border-gray-200 rounded-md border-l-4 border-l-blue-500"
                    >
                      <CardContent className="pt-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                          <div>
                            <h3 className="font-bold">{course?.course.name}</h3>
                            <p className="text-gray-600 text-sm">
                              {course?.course.code}
                            </p>
                          </div>
                          <div className="flex gap-2 mt-2 lg:mt-0">
                            <Badge
                              variant="outline"
                              className="rounded-full"
                            >
                              Ciclo {course?.course?.academic_cycle}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className="rounded-full"
                            >
                              {course?.course.credits} créditos
                            </Badge>
                          </div>
                        </div>

                        {course.groups.map((group) => (
                          <div
                            key={group.id}
                            className="space-y-3"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Docente:</span>
                                <p
                                  className={
                                    group?.teacher === 'Docente no asignado'
                                      ? 'text-red-500'
                                      : 'text-gray-700'
                                  }
                                >
                                  {group?.teacher}
                                </p>
                              </div>
                              <div>
                                <span className="font-medium">Grupo:</span>
                                <p className="text-gray-700">{group?.group}</p>
                              </div>
                              <div>
                                <span className="font-medium">alumnos:</span>
                                <p className="text-gray-700">
                                  {group?.students_enrolled}/
                                  {group?.max_students}
                                </p>
                              </div>
                            </div>

                            {group?.schedule?.length > 0 ? (
                              <div>
                                <h4 className="font-medium mb-2">Horario:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                  {group?.schedule?.map((schedule) => (
                                    <div
                                      key={schedule?.id}
                                      className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-md"
                                    >
                                      <Clock className="w-4 h-4 text-gray-500" />
                                      <span className="font-medium">
                                        {schedule?.day}
                                      </span>
                                      <span>
                                        {schedule?.start_time} -{' '}
                                        {schedule?.end_time}
                                      </span>
                                      <MapPin className="w-4 h-4 text-gray-500" />
                                      <span>{schedule?.room_name}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <Alert>
                                <AlertDescription>
                                  No hay horario asignado para este curso.
                                </AlertDescription>
                              </Alert>
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Horario */}
          <TabsContent
            value="schedule"
            className="space-y-6"
          >
            <Card className="border-0 rounded-md">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Horario Semanal
                  </CardTitle>
                  {dateRanges.length > 0 && (
                    <div className="flex items-center gap-3">
                      <label className="text-sm font-medium text-gray-600">
                        Rango de fechas:
                      </label>
                      <Select
                        value={selectedDateRange}
                        onValueChange={setSelectedDateRange}
                      >
                        <SelectTrigger className="w-[220px]">
                          <SelectValue placeholder="Seleccionar rango" />
                        </SelectTrigger>
                        <SelectContent>
                          {dateRanges.map((range) => (
                            <SelectItem
                              key={range.id}
                              value={range.id}
                            >
                              {range.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20 border">Hora</TableHead>
                        {days.map((day) => (
                          <TableHead
                            key={day}
                            className="text-center min-w-32 border"
                          >
                            {day}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>{renderGroupedSchedule()}</TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {/* Banner de Información de Matrícula - Estilo mejorado */}
    </div>
  )
}
