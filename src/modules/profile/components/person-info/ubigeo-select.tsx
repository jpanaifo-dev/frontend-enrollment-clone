/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useUbigeo } from '@/modules/app/hooks'
import { ChevronsUpDown, X, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDebouncedCallback } from 'use-debounce'
import { IUbigeo } from '@/types'

const DEBOUNCE_TIME = 500

interface UbigeoSelectProps {
  open: boolean
  setOpen: (value: boolean) => void
  onChange: (value: string) => void
  placeholder?: string
  popoverClassName?: string
  defaultUbigeo: IUbigeo | null
  disabled?: boolean
}

export const UbigeoSelect = ({
  open,
  setOpen,
  defaultUbigeo,
  onChange,
  popoverClassName,
  placeholder,
  disabled = false,
}: UbigeoSelectProps) => {
  const { ubigeoList, getUbigeoFilterData, loading } = useUbigeo()

  const [valueUbigeo, setValueUbigeo] = useState<IUbigeo | null>(defaultUbigeo)
  const [queryUbigeo, setQueryUbigeo] = useState<string>('')
  const [debouncedQuery, setDebouncedQuery] = useState<string>('')

  // Debounce solo para la búsqueda, sin afectar el input en tiempo real
  const debounced = useDebouncedCallback((value: string) => {
    setDebouncedQuery(value)
  }, DEBOUNCE_TIME)

  // Ejecutar la búsqueda cuando el `queryUbigeo` cambia
  useEffect(() => {
    getUbigeoFilterData({
      query: queryUbigeo.trim(),
    })
  }, [debouncedQuery])

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <section className="flex items-center border rounded-md">
        <PopoverTrigger
          disabled={!!valueUbigeo}
          asChild
        >
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between truncate"
            type="button"
            disabled={disabled}
          >
            {valueUbigeo
              ? `${valueUbigeo.district}, ${valueUbigeo.province}, Región de ${valueUbigeo.region} - ${valueUbigeo.code}`
              : placeholder || 'Seleccione una ubicación'}
            {!valueUbigeo && (
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            )}
          </Button>
        </PopoverTrigger>
        {valueUbigeo && (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={disabled}
                  onClick={(e) => {
                    e.stopPropagation()
                    setValueUbigeo(null)
                    onChange('')
                    setOpen(true)
                  }}
                  size="icon"
                  variant="ghost"
                  type="button"
                >
                  <X className="shrink-0 opacity-80 font-bold" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="dark text-white">
                Limpiar selección
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </section>
      <PopoverContent
        className={cn(
          'w-full sm:min-w-96 lg:min-w-[540px] p-0',
          popoverClassName
        )}
      >
        <Command>
          <div>
            <Input
              value={queryUbigeo}
              onChange={(e) => {
                setQueryUbigeo(e.target.value) // Actualiza el estado en tiempo real
                debounced(e.target.value) // Llama a la búsqueda con debounce
              }}
              placeholder="Buscar ubicación..."
            />
          </div>
          <CommandList>
            {loading ? (
              <div className="flex justify-center items-center py-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <>
                <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                <CommandGroup>
                  {ubigeoList?.map((ubigeo) => (
                    <CommandItem
                      key={ubigeo.uuid}
                      value={ubigeo.uuid}
                      onSelect={() => {
                        setValueUbigeo(ubigeo)
                        onChange(ubigeo.uuid)
                        setOpen(false)
                      }}
                    >
                      {ubigeo.district}, {ubigeo.province}, Región de{' '}
                      {ubigeo.region} - {ubigeo.code}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
