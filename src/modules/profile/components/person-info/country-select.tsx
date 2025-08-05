/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useCountry } from '@/modules/app/hooks'
import { ICountry } from '@/types'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const DEBOUNCE_TIME = 500

interface CountrySelectProps {
  onChange: (value: string) => void
  placeholder?: string
  defaultCountry: ICountry | null
  disabled?: boolean
}

export const CountrySelect = ({
  defaultCountry,
  onChange,
  placeholder,
  disabled,
}: CountrySelectProps) => {
  const { countryList, getCountryFilterData } = useCountry()

  const [valueCountry, setValueCountry] = useState<ICountry | null>(
    defaultCountry
  )
  const [queryCountry, setQueryCountry] = useState<string>('')

  // Cargar lista inicial de países
  useEffect(() => {
    getCountryFilterData('')
  }, [])

  // Debounce para la búsqueda
  const debounced = useDebouncedCallback((value: string) => {
    getCountryFilterData(value.trim())
  }, DEBOUNCE_TIME)

  const selectedCountry = valueCountry

  return (
    <div className="flex flex-col gap-2">
      {selectedCountry ? (
        <div className="flex items-center border rounded-md">
          <div
            className={cn('flex-1 p-2', {
              'text-muted-foreground': disabled,
            })}
          >
            {`${selectedCountry.name}, ${selectedCountry.code}`}
          </div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    setValueCountry(null)
                    onChange('')
                    setQueryCountry('')
                    getCountryFilterData('')
                  }}
                  size="icon"
                  variant="ghost"
                  type="button"
                  disabled={disabled}
                >
                  <X className="shrink-0 opacity-80 font-bold" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="dark">
                Limpiar selección
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : (
        <>
          <Input
            value={queryCountry}
            onChange={(e) => {
              const value = e.target.value
              setQueryCountry(value)
              debounced(value)
            }}
            placeholder={placeholder || 'Buscar país...'}
          />
          {countryList && countryList.length > 0 && (
            <div className="border rounded-md max-h-60 overflow-auto">
              {countryList.map((country) => (
                <div
                  key={country.uuid}
                  className="p-2 hover:bg-accent cursor-pointer"
                  onClick={() => {
                    setValueCountry(country)
                    onChange(country.uuid)
                  }}
                >
                  {country.name}, {country.code}
                </div>
              ))}
            </div>
          )}
          {countryList && countryList.length === 0 && queryCountry && (
            <div className="p-2 text-center text-muted-foreground">
              No se encontraron resultados
            </div>
          )}
        </>
      )}
    </div>
  )
}
