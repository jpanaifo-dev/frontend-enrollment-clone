'use client'

import type React from 'react'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Upload, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { uploapFilesManager } from '@/api/files'
import { FileSchemaType } from '../../schemas'
import { toast } from 'react-toastify'
import { ToastCustom } from '@/components/app'

// Constantes para la validación
const MAX_FILE_SIZE = 1 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

import { IPerson } from '@/types'
import { updatePersonPhoto } from '@/api/persons/person.update'

// Esquema simplificado para el formulario
const formSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Formato de imagen no válido',
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: 'El archivo debe ser menor a 1MB',
    })
    .optional(),
  fileUrl: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface ProfilePictureUploadProps {
  urlImage: string
  personData: IPerson
  person_uuid: string
  onUpload?: (fileData: Partial<FileSchemaType>) => Promise<void>
  //   requirement?: number
  //   file_Type?: number
}

export function ProfilePictureUpload({
  urlImage,
  person_uuid,
  onUpload,
  personData,
}: //   requirement = 0,
//   file_Type = 0,
ProfilePictureUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(urlImage)
  const [isDragging, setIsDragging] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: urlImage || undefined,
    },
  })

  const handleFileChange = (file: File | null) => {
    if (!file) return

    // Validar el tipo de archivo
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      form.setError('file', {
        type: 'manual',
        message: 'Formato de imagen no válido',
      })
      return
    }

    // Validar el tamaño del archivo
    if (file.size > MAX_FILE_SIZE) {
      form.setError('file', {
        type: 'manual',
        message: 'El archivo debe ser menor a 1MB',
      })
      return
    }

    // Create a preview URL
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    form.setValue('file', file)
    form.clearErrors('file')
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileChange(files[0])
    }
  }

  const handleSubmit = async (values: FormValues) => {
    if (!values.file) return

    try {
      setIsUploading(true)

      // Preparar los datos según el esquema fileManagerSchema
      const fileData: Partial<FileSchemaType> = {
        person_uuid,
        file: [values.file], // El esquema espera un array de archivos
        is_active: true,
        is_valid: false,
        file_Type: 1,
      }

      const responseData = await uploapFilesManager(fileData, null)

      if (responseData.errors) {
        toast.error(
          <ToastCustom
            title="Error al subir la imagen"
            description={responseData.errors.join(', ')}
          />
        )
      } else {
        const fileUrl = responseData.data?.file as unknown as string
        if (personData) {
          const updateResponse = await updatePersonPhoto({
            personToken: personData.uuid,
            photo: fileUrl,
          })

          if (updateResponse.errors && updateResponse.errors.length > 0) {
            toast.error(
              <ToastCustom
                title="Error al actualizar los datos"
                description={updateResponse.errors?.join(', ')}
              />
            )
          } else {
            toast.success(
              <ToastCustom
                title="Datos actualizados"
                description="Los datos se actualizaron correctamente"
              />
            )
            window.location.reload()
          }
        }
      }

      // Si hay una función onUpload, llamarla con los datos del archivo
      if (onUpload) {
        await onUpload(fileData)
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      form.setError('file', {
        type: 'manual',
        message: 'Error al subir el archivo',
      })
    } finally {
      setIsUploading(false)
      setIsOpen(false) // Cerrar el modal después de una carga exitosa
    }
  }

  const clearFile = () => {
    form.setValue('file', undefined)
    if (previewUrl && previewUrl !== urlImage) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(urlImage)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-32 w-32">
        <AvatarImage
          src={urlImage || ''}
          alt="Foto de perfil"
          className="h-52 w-52 object-cover"
        />
        <AvatarFallback className="text-sm">
          {urlImage ? 'Cargando...' : 'No hay foto'}
        </AvatarFallback>
      </Avatar>

      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogTrigger asChild>
          <Button variant="outline">Cambiar foto</Button>
        </DialogTrigger>
        <DialogContent
          aria-label="foto-dialog"
          className="sm:max-w-md"
        >
          <DialogHeader>
            <DialogTitle>Cambiar foto de perfil</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="space-y-4 py-4">
                <div className="flex flex-col items-center justify-center gap-4">
                  <Avatar className="h-52 w-52">
                    <AvatarImage
                      src={previewUrl || ''}
                      className="h-52 w-52 object-cover"
                      alt="Foto de perfil"
                    />
                    <AvatarFallback className="text-sm">
                      {previewUrl ? 'Cargando...' : 'No hay foto'}
                    </AvatarFallback>
                  </Avatar>

                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <div
                            className={cn(
                              'relative flex flex-col items-center justify-center rounded-lg border border-dashed p-6 transition-colors',
                              isDragging
                                ? 'border-primary bg-primary/5'
                                : 'border-muted-foreground/25 hover:border-primary/50',
                              field.value && 'border-primary/50 bg-primary/5'
                            )}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                          >
                            {field.value ? (
                              <div className="flex flex-col items-center gap-2">
                                <p className="text-sm font-medium">
                                  {(field.value as File).name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {((field.value as File).size / 1024).toFixed(
                                    2
                                  )}{' '}
                                  KB
                                </p>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={clearFile}
                                  className="mt-2"
                                >
                                  <X className="mr-2 h-4 w-4" />
                                  Eliminar
                                </Button>
                              </div>
                            ) : (
                              <>
                                <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                                <p className="mb-1 text-sm font-medium">
                                  Arrastra y suelta tu foto aquí
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  O haz clic para seleccionar un archivo
                                </p>
                                <input
                                  type="file"
                                  accept={ACCEPTED_IMAGE_TYPES.join(',')}
                                  className="absolute inset-0 cursor-pointer opacity-0"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0] || null
                                    handleFileChange(file)
                                  }}
                                />
                              </>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Sube una imagen para tu perfil (máx. 1MB).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    clearFile()
                    setIsOpen(false)
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  disabled={!form.getValues().file || isUploading}
                  onClick={form.handleSubmit(handleSubmit)}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Subiendo...
                    </>
                  ) : (
                    'Guardar Foto'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
