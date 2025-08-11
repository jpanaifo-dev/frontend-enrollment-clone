'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IStudentProgram } from '@/types'
import { useFilterFromUrl } from '@/lib/filter-url'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarIcon, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useState, useEffect } from 'react'

interface EnrollmentFiltersProps {
  programsAssigned: IStudentProgram[]
}

export const EnrollmentFilters = (props: EnrollmentFiltersProps) => {
  const { programsAssigned } = props
  const { getParams, updateFilter } = useFilterFromUrl()
  const [date, setDate] = useState<Date | undefined>()

  const uuid_student = getParams({
    key: 'student',
    value: '',
  })
  const dateParam = getParams({
    key: 'date',
    value: '',
  })

  useEffect(() => {
    if (dateParam) {
      setDate(new Date(dateParam))
    }
  }, [dateParam])

  const handleChange = (value: string) => {
    if (value === programsAssigned[0]?.id.toString()) {
      updateFilter({
        student: '',
      })
    } else {
      updateFilter({
        student: value,
      })
    }
  }

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      updateFilter({
        date: selectedDate.toISOString(),
      })
    } else {
      updateFilter({
        date: '',
      })
    }
  }

  const clearDate = () => {
    setDate(undefined)
    updateFilter({
      date: '',
    })
  }

  return (
    <div className="flex gap-4 items-center flex-wrap">
      <div className="w-full max-w-md">
        <Label className="block mb-2 text-sm font-medium">
          Mis Programas Asignados
        </Label>
        <Select
          onValueChange={handleChange}
          defaultValue={uuid_student || programsAssigned[0]?.id.toString()}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Selecciona un programa" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {programsAssigned.map((program) => (
                <SelectItem
                  key={program.id.toString()}
                  value={program.id.toString()}
                >
                  {program.program_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium">Fecha de Matrícula</Label>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[240px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, 'PPP', { locale: es })
                ) : (
                  <span>Seleccionar fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                initialFocus
                locale={es}
              />
            </PopoverContent>
          </Popover>
          {date && (
            <Button
              size="icon"
              onClick={clearDate}
              className="h-10 w-10"
              variant="ghost"
            >
              <X className="h-4 w-4 text-red-600" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
