/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUbigeo } from '@/modules/app/hooks'
import { useFormPersonStore } from '@/modules/account/hooks/use-form-person-store'
import { PersonContactSchema, PersonContactSchemaType } from '../../schemas'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { updatePersonContact } from '@/api/persons/person-contact'
import { ToastCustom, InputPhone } from '@/components/app'

// For labels and placeholders to be displayed in the form
import { PROFILE_FORM_LABELS, LABELS_BUTTONS_FORM } from '../config.constants'
import { IContactInfoFormProps } from '../profile.interfaces.props'
import { toast } from 'react-toastify'
const { CONTACT_FORM } = PROFILE_FORM_LABELS
const { FIELDS, TITLE, DESCRIPTION, MESSAGE } = CONTACT_FORM

import { ChevronsUpDown, X } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
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
import { usePreventUnload } from '@/hooks'
import { LoadingAbsolute } from '@/components/app'

export function ContactInfoForm(props: IContactInfoFormProps) {
  const { defaultData, person_token, disabled } = props

  const { ubigeoList, getUbigeoFilterData } = useUbigeo()

  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  const [value, setValue] = useState<string>(
    defaultData?.ubigeo_address_uuid || ''
  )
  const { setIsDirty } = useFormPersonStore()

  const form = useForm<PersonContactSchemaType>({
    resolver: zodResolver(PersonContactSchema),
    defaultValues: {
      address: defaultData?.address || '',
      linkedin: defaultData?.linkedin || '',
      ubigeo_address_uuid: defaultData?.ubigeo_address_uuid || '',
      whatsapp_phone: defaultData?.whatsapp_phone || '',
      email: defaultData?.email?.toString() || '',
      phone: defaultData?.phone || '',
    },
  })

  const isDirty = form.formState.isDirty
  usePreventUnload(isDirty)

  useEffect(() => {
    setIsDirty(isDirty)
  }, [isDirty])

  async function onSubmit(data: PersonContactSchemaType) {
    setLoading(true)
    const response = await updatePersonContact(person_token, data)

    if (response?.errors && response.status !== 200) {
      toast.error(
        <ToastCustom
          title="Error al actualizar datos"
          description={response.errors.join(', ')}
        />
      )
      return
    } else {
      toast.success(
        <ToastCustom
          title="Datos actualizados"
          description={`Los datos de contacto han sido actualizados correctamente.`}
        />
      )
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    }
    setLoading(false)
  }

  useEffect(() => {
    const queryValue = query.trim() || value.trim()
    getUbigeoFilterData({ query: queryValue })
  }, [query, value])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full"
      >
        <div className="space-y-4 w-full">
          <header className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold">{TITLE}</h2>
            <p className="text-sm text-gray-500">{DESCRIPTION}</p>
            <p className="text-sm text-gray-500">{MESSAGE}</p>
          </header>
          <section className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{FIELDS.address.label}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={disabled}
                      placeholder={FIELDS.address.placeholder}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ubigeo_address_uuid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{FIELDS.ubigeoCode.label}</FormLabel>
                  <Popover
                    open={open}
                    onOpenChange={setOpen}
                  >
                    <section className="flex items-center border rounded-md">
                      <PopoverTrigger
                        disabled={loading || value !== ''}
                        asChild
                      >
                        <Button
                          variant="ghost"
                          role="combobox"
                          aria-expanded={open}
                          disabled={loading || disabled}
                          className="w-full justify-between"
                        >
                          {value
                            ? ubigeoList?.find(
                                (ubigeoList) => ubigeoList.uuid === value
                              )
                              ? `${
                                  ubigeoList.find(
                                    (ubigeoList) => ubigeoList.uuid === value
                                  )?.district
                                }, ${
                                  ubigeoList.find(
                                    (ubigeoList) => ubigeoList.uuid === value
                                  )?.province
                                }, Región de ${
                                  ubigeoList.find(
                                    (ubigeoList) => ubigeoList.uuid === value
                                  )?.region
                                } - ${
                                  ubigeoList.find(
                                    (ubigeoList) => ubigeoList.uuid === value
                                  )?.code
                                }`
                              : 'Seleccione su ubicación'
                            : 'Seleccione su ubicación'}
                          {!value && (
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          )}
                        </Button>
                      </PopoverTrigger>
                      {value && (
                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setValue('')
                                  field.onChange(undefined)
                                }}
                                size="icon"
                                variant="ghost"
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
                      )}
                    </section>
                    <PopoverContent className="w-full sm:min-w-96 lg:min-w-[540px] p-0">
                      <Command>
                        <div>
                          <Input
                            value={query}
                            onChange={(e) => {
                              setQuery(e.target.value)
                            }}
                            disabled={disabled}
                            placeholder="Buscar ubicación..."
                          />
                        </div>
                        <CommandList>
                          <CommandEmpty>
                            No se encontraron resultados.
                          </CommandEmpty>
                          <CommandGroup>
                            {ubigeoList?.map((address) => (
                              <CommandItem
                                key={address.uuid}
                                value={address.uuid}
                                onSelect={(currentValue) => {
                                  setValue(
                                    currentValue === value
                                      ? defaultData?.ubigeo_address_uuid || ''
                                      : currentValue
                                  )
                                  field?.onChange(
                                    currentValue === value
                                      ? defaultData?.ubigeo_address_uuid || ''
                                      : currentValue
                                  )
                                  setOpen(false)
                                }}
                              >
                                {address?.district}, {address?.province}, Región
                                de {address?.region} - {address?.code}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{FIELDS.email.label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    value={field.value || ''}
                    disabled={disabled}
                    placeholder={FIELDS.email.placeholder}
                  />
                </FormControl>
                <FormDescription>{FIELDS.email.description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <section className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{FIELDS.cellphone.label}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      disabled={disabled}
                      value={field.value || ''}
                      placeholder={FIELDS.cellphone.placeholder}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whatsapp_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{FIELDS.whatsapp.label}</FormLabel>
                  <FormControl>
                    <InputPhone
                      value={field.value || ''}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
        </div>
        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{FIELDS.linkedin.label}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ''}
                  placeholder={FIELDS.linkedin.placeholder}
                  disabled={disabled}
                />
              </FormControl>
              <FormDescription>{FIELDS.linkedin.description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {!disabled && (
          <div className="flex justify-end gap-4">
            <Button
              type="submit"
              disabled={!isDirty || loading}
            >
              {LABELS_BUTTONS_FORM.SAVE}
            </Button>
          </div>
        )}
      </form>
      <LoadingAbsolute show={loading} />
    </Form>
  )
}
