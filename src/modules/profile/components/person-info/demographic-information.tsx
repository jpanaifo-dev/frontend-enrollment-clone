'use client'
import { PersonInfoSchemaType } from '../../schemas'
import { IPerson } from '@/types'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PROFILE_FORM_LABELS } from '../config.constants'

const { PROFILE_FORM } = PROFILE_FORM_LABELS
const { DEMOGRAPHIC_INFORMATION } = PROFILE_FORM
const { FIELDS, DESCRIPTION, TITLE } = DEMOGRAPHIC_INFORMATION
interface PersonalInformationProps {
  defaultData?: IPerson
  disabled?: boolean
}

export const DemographicInformation = (props: PersonalInformationProps) => {
  const { defaultData, disabled } = props
  const form = useFormContext<PersonInfoSchemaType>()

  const defaultIndigenous = defaultData?.comunity_indigenous
  const initialIsIndigenous = Boolean(defaultIndigenous)

  const defaultDisability = defaultData?.disability
  const initialDisability = Boolean(defaultDisability)

  const [isOtherLanguage, setIsOtherLanguage] = useState(false)

  const [isIndigenous, setIsIndigenous] = useState<boolean>(
    false || initialIsIndigenous
  )
  const [isDisability, setIsDisability] = useState<boolean>(
    false || initialDisability
  )

  return (
    <div className="flex flex-col space-y-6 md:space-y-8">
      <header>
        <h2 className="text-2xl font-bold">{TITLE}</h2>
        <p>{DESCRIPTION}</p>
      </header>
      <section className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="native_language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{FIELDS.nativeLanguage.label}</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-2">
                  {['Inglés', 'Portugués', 'Español'].map((language) => (
                    <div
                      key={language}
                      className="flex items-center gap-2"
                    >
                      <Checkbox
                        id={language.toLowerCase()}
                        checked={field.value === language}
                        disabled={disabled}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIsOtherLanguage(false) // Ocultar el input de "Otros"
                            if (field.value !== language) {
                              field.onChange(language)
                            }
                          }
                        }}
                      />
                      <Label htmlFor={language.toLowerCase()}>{language}</Label>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="otros"
                      checked={isOtherLanguage}
                      onCheckedChange={(checked) => {
                        setIsOtherLanguage(Boolean(checked))
                        if (checked === 'indeterminate') {
                          field.onChange('') // Limpiar el valor si "Otros" es desmarcado
                        }
                      }}
                      disabled={disabled}
                    />
                    <Label htmlFor="otros">Otros</Label>
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                {FIELDS.nativeLanguage.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {isOtherLanguage && (
          <FormField
            control={form.control}
            name="native_language"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="native-language-other"
                    placeholder="Ingresa tu idioma"
                    value={field.value}
                    disabled={disabled}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormDescription>
                  Escribe tu idioma si seleccionaste Otros.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </section>
      <section
        id="personal-native-info-form"
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="comunity_indigenous"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center gap-2 w-full">
                  <Checkbox
                    checked={isIndigenous}
                    disabled={disabled}
                    onCheckedChange={(checked) => {
                      setIsIndigenous(Boolean(checked))
                      if (checked === false) {
                        field.onChange('')
                      } else {
                        field.onChange(defaultIndigenous)
                      }
                    }}
                    id="comunity-indigenous-check"
                  />
                  <Label
                    id="comunity-indigenous-check"
                    className="w-full"
                    htmlFor="comunity-indigenous-check"
                  >
                    {FIELDS.comunityIndigenous.label}
                  </Label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isIndigenous && (
          <FormField
            control={form.control}
            name="comunity_indigenous"
            render={({ field }) => (
              <FormItem>
                <FormDescription>
                  {FIELDS.comunityIndigenous.description}
                </FormDescription>
                <FormControl>
                  <Input
                    id="comunity-indigenous-name"
                    disabled={disabled}
                    placeholder={FIELDS.comunityIndigenous.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </section>
      <section className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="disability"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={isDisability}
                    onCheckedChange={(checked) => {
                      setIsDisability(Boolean(checked))

                      if (checked === false) {
                        field.onChange('')
                      } else {
                        field.onChange(defaultDisability)
                      }
                    }}
                    disabled={disabled}
                    id="disability-check"
                  />
                  <Label
                    id="disability-check"
                    className="w-full"
                    htmlFor="disability-check"
                  >
                    {FIELDS.disability.label}
                  </Label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isDisability && (
          <FormField
            control={form.control}
            name="disability"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="disability"
                    placeholder="Descripción de la discapacidad"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                  />
                </FormControl>
                <FormDescription>
                  {FIELDS.disability.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </section>
    </div>
  )
}
