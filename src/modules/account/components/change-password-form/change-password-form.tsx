'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { InputPassword } from '@/components/auth/input-password'
import {
  ChangePasswordFormValues,
  formSchemaChangePassword,
} from '../../schemas'
import { changePassword } from '@/api/auth'
import { toast } from 'react-toastify'
import { ToastCustom } from '@/components/app'
import { usePreventUnload } from '@/hooks'

interface ChangePasswordFormProps {
  userToken: string
}

export const ChangePasswordForm = ({ userToken }: ChangePasswordFormProps) => {
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState<ChangePasswordFormValues | null>(
    null
  )

  const form = useForm({
    resolver: zodResolver(formSchemaChangePassword),
    defaultValues: {
      user_token: userToken,
      password: '',
      newpassword: '',
      confirm_password: '',
    },
  })

  const isDirty = form.formState.isDirty
  usePreventUnload(isDirty)

  const handleConfirm = async () => {
    if (!formData) return

    try {
      const response = await changePassword(formData)
      if (response.errors) {
        toast.error(
          <ToastCustom
            title="Error"
            description={response.errors.join(', ')}
          />
        )
      } else {
        toast.success(
          <ToastCustom
            title="Éxito"
            description="Contraseña actualizada correctamente. Serás redirigido a la página de inicio de sesión."
          />
        )

        form.reset()

        const deleteSession = async () => {
          try {
            const response = await fetch('/api/auth/logout', {
              method: 'DELETE',
            })
            const data = await response.json()

            if (data.success) {
              router.refresh()
            }
          } catch (error) {
            console.error('Error cerrando sesión:', error)
          }
        }
        deleteSession()
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error)
    } finally {
      setIsDialogOpen(false)
    }
  }

  const onSubmit = (values: ChangePasswordFormValues) => {
    setFormData(values)
    setIsDialogOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Cambiar contraseña</CardTitle>
          <CardDescription>
            Actualice su contraseña para mantener su cuenta segura.
          </CardDescription>
        </CardHeader>
        <hr />
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-4 md:px-4 py-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* Contraseña actual */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña actual</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nueva contraseña con validación y visibilidad */}
              <FormField
                control={form.control}
                name="newpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nueva contraseña</FormLabel>
                    <FormControl>
                      <InputPassword {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirmar contraseña */}
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar nueva contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Botón de actualización */}
              <footer className="flex justify-end pt-4 md:pt-6">
                <Button
                  type="submit"
                  disabled={!isDirty}
                >
                  Actualizar contraseña
                </Button>
              </footer>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Diálogo de confirmación */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar cambio de contraseña</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            ¿Estás seguro de que quieres cambiar tu contraseña? Serás **cerrado
            de sesión** y deberás volver a iniciar sesión con tu nueva
            contraseña.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleConfirm}>
              Confirmar y cambiar contraseña
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
