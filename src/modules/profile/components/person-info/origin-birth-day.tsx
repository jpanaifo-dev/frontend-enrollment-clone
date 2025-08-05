'use client'
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PersonInfoSchemaType } from '../../schemas'
import { ICountry, IPerson, IUbigeo } from '@/types'
import { format } from 'date-fns'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { PROFILE_FORM_LABELS } from '../config.constants'
import { CountrySelect } from './country-select'
import { UbigeoSelect } from './ubigeo-select'

const { PROFILE_FORM } = PROFILE_FORM_LABELS
const { ORIGIN_AND_BIRTH } = PROFILE_FORM
const { FIELDS, DESCRIPTION, TITLE } = ORIGIN_AND_BIRTH

interface PersonalInformationProps {
  defaultData?: IPerson
  countryDefaultData: ICountry | null
  ubigeoDefaultData: IUbigeo | null
  isEditing?: boolean
}

export const OriginBirthDay = (props: PersonalInformationProps) => {
  const { countryDefaultData, ubigeoDefaultData, isEditing } = props
  const form = useFormContext<PersonInfoSchemaType>()

  //popovers state
  const [openUbigeo, setOpenUbigeo] = useState(false)

  return (
    <section id="personal-birth-info-form">
      <header>
        <h2 className="text-2xl font-bold">{TITLE}</h2>
        <p>{DESCRIPTION}</p>
      </header>
      <section className="grid gap-4 grid-cols-1 md:grid-cols-2 py-7">
        <FormField
          control={form.control}
          name="birthdate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{FIELDS.birthdate.label}</FormLabel>
              <Input
                type="date"
                {...field}
                max={format(
                  new Date(
                    new Date().setFullYear(new Date().getFullYear() - 18)
                  ),
                  'yyyy-MM-dd'
                )}
                className="w-full flex justify-between items-center px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={field?.value || ''}
                disabled={!isEditing}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="hidden md:flex"></div>
        <FormField
          control={form.control}
          name="country_uuid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{FIELDS.country.label}</FormLabel>
              <CountrySelect
                defaultCountry={countryDefaultData}
                onChange={field.onChange}
                disabled={!isEditing}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ubigeo_birth_uuid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{FIELDS.birthplace.label}</FormLabel>
              <UbigeoSelect
                defaultUbigeo={ubigeoDefaultData}
                open={openUbigeo}
                setOpen={setOpenUbigeo}
                placeholder={FIELDS.birthplace.placeholder}
                onChange={(currentValue) => {
                  field?.onChange(currentValue)
                }}
                disabled={!isEditing}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </section>
    </section>
  )
}
