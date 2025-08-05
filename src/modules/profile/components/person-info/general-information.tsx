'use client'
import { useFormContext } from 'react-hook-form'
import { PersonInfoSchemaType } from '../../schemas'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { PROFILE_FORM_LABELS } from '../config.constants'
import { useDocumentTypes, useMaritalStatus } from '@/modules/app/hooks'
import { IPerson } from '@/types'
import { ProfilePictureUpload } from './photo-profile-form'

const { PROFILE_FORM } = PROFILE_FORM_LABELS
const { GENERAL_INFORMATION } = PROFILE_FORM
const { FIELDS } = GENERAL_INFORMATION

const genders = [
  { value: '1', label: 'Masculino' },
  { value: '2', label: 'Femenino' },
]

interface PersonalInformationProps {
  defaultData?: IPerson
  isEditing?: boolean
}

export const GeneralInformation = (props: PersonalInformationProps) => {
  const { defaultData, isEditing } = props
  const form = useFormContext<PersonInfoSchemaType>()
  const { documentTypes, loading: loadingDocs } = useDocumentTypes()
  const { maritalStatus } = useMaritalStatus()

  const imageProfileDefault = defaultData?.photo

  return (
    <main className="flex flex-col gap-6">
      <header>
        <h2 className="text-2xl font-bold">{GENERAL_INFORMATION.TITLE}</h2>
        <p>{GENERAL_INFORMATION.DESCRIPTION}</p>
      </header>
      <section
        id="personal-info-form"
        className="flex flex-col gap-4 md:gap-6"
      >
        {defaultData && (
          <ProfilePictureUpload
            personData={defaultData}
            urlImage={imageProfileDefault || ''}
            person_uuid={defaultData?.uuid || ''}
          />
        )}
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="document_type"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel htmlFor="document-type">
                  {FIELDS.identityDocument.label}
                </FormLabel>
                <FormControl>
                  <Select
                    value={String(value)}
                    onValueChange={onChange}
                    disabled={loadingDocs || !isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          loadingDocs
                            ? 'Cargando...'
                            : 'Seleccione un tipo de documento'
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem
                          key={type.id.toString()}
                          value={type.id.toString()}
                        >
                          {type.name} - {type.abbreviation}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  {FIELDS.identityDocument.description}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="document_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="document-number">
                  {FIELDS.documentNumber.label}
                </FormLabel>
                <FormControl>
                  <Input
                    id="document-number"
                    placeholder="Ingrese su número de documento"
                    disabled={!isEditing || true}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  {FIELDS.documentNumber.description}
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="names"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="names">{FIELDS.firstName.label}</FormLabel>
              <FormControl>
                <Input
                  id="names"
                  placeholder="Ingrese su nombre completo"
                  disabled={!isEditing || true}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <section className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="last_name1"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="first-surname">
                  {FIELDS.lastName.label}
                </FormLabel>
                <FormControl>
                  <Input
                    id="first-surname"
                    placeholder="Ingrese el primer apellido"
                    disabled={isEditing || true}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name2"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="second-surname">
                  {FIELDS.secondLastName.label}
                </FormLabel>
                <FormControl>
                  <Input
                    id="second-surname"
                    placeholder="Ingrese el segundo apellido"
                    disabled={!isEditing || true}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <section
          id="community-indigenous"
          className="grid gap-4 md:grid-cols-2"
        >
          <FormField
            control={form.control}
            name="gender"
            defaultValue={defaultData?.gender?.toString()}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{FIELDS.gender.label}</FormLabel>
                <Select
                  defaultValue={defaultData?.gender?.toString()}
                  onValueChange={field.onChange}
                  disabled={!isEditing || true}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={FIELDS.gender.placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genders.map((gender) => (
                      <SelectItem
                        key={gender.value}
                        value={gender.value}
                      >
                        {gender.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="marital_status"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>{FIELDS.maritalStatus.label}</FormLabel>
                <Select
                  onValueChange={(value) => onChange(Number(value))}
                  value={value ? value.toString() : ''}
                  disabled={!isEditing || true}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={FIELDS?.maritalStatus?.placeholder}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {maritalStatus.map((status) => (
                      <SelectItem
                        key={status.id}
                        value={status.id.toString()}
                      >
                        {status.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
      </section>
    </main>
  )
}
