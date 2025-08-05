'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle } from 'lucide-react'
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { IUserAuth } from '@/types'
import { formSchemaEmailChange, EmailChangeFormValues } from '../../schemas'
import { emailChangeFunction } from '@/api/auth'
import { toast } from 'react-toastify'
import { ToastCustom } from '@/components/app'

export const ChangeEmailForm = ({ userAuth }: { userAuth: IUserAuth }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newEmail, setNewEmail] = useState('')

  const form = useForm({
    resolver: zodResolver(formSchemaEmailChange),
    defaultValues: {
      user_token: userAuth.user_token,
      email: '',
    },
  })

  const isDirty = form.formState.isDirty

  const onSubmit = (values: EmailChangeFormValues) => {
    setNewEmail(values.email)
    setIsDialogOpen(true)
  }

  const handleConfirm = async () => {
    const { data, errors } = await emailChangeFunction(form.getValues())

    if (errors) {
      form.setError('email', {
        type: 'manual',
        message: errors.join(', '),
      })
      toast.error(
        <ToastCustom
          title="¡Error!"
          description="No se pudo cambiar el correo electrónico."
        />
      )
      setIsDialogOpen(false)
      return
    }
    if (data) {
      setIsDialogOpen(false)
      toast.success(
        <ToastCustom
          title="¡Éxito!"
          description={data.message}
        />
      )
      form.reset()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">Cambiar correo electrónico</CardTitle>
        <CardDescription>
          Actualice su dirección de correo electrónico asociada a esta cuenta.
          El correo electrónico actual es <strong>{userAuth.email}</strong>.
          Recuerda que este correo es el que se utilizará para iniciar sesión y
          recibir notificaciones.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nuevo correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="correo@ejemplo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="text-sm text-muted-foreground flex items-center">
              <AlertCircle className="mr-2 h-4 w-4" />
              Se enviará una notificación a tu correo actual para confirmar el
              cambio.
            </p>

            <footer
              id="change-password-form"
              className="flex justify-end"
            >
              <Button
                disabled={!isDirty}
                type="submit"
              >
                Solicitar cambio de correo
              </Button>
            </footer>
          </form>
        </Form>

        <Dialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar cambio de correo electrónico</DialogTitle>
              <DialogDescription>
                ¿Estás seguro de que deseas cambiar tu correo electrónico a{' '}
                {newEmail}?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleConfirm}>Confirmar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
