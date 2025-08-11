'use client'
import { dataUrls } from './data.urls.profile'
import { useFormPersonStore } from '@/modules/account/hooks/use-form-person-store'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useState } from 'react'
import { LayoutProfileWrapper } from '@/modules/app'

export function LayoutProfile({
  children,
}: {
  children: React.ReactNode
  token?: string
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [pathUrl, setPathUrl] = useState<string | null>(null)
  const { isDirty, setIsDirty } = useFormPersonStore()

  const router = useRouter()

  const handleDialogAction = () => {
    setIsDialogOpen(false)
    setIsDirty(false)
    if (pathUrl) {
      router.push(pathUrl)
    }
  }

  return (
    <div className="bg-transparent w-full">
      <LayoutProfileWrapper
        items={dataUrls}
        handleNavigation={(path: string) => {
          if (isDirty) {
            setPathUrl(path)
            setIsDialogOpen(true)
          } else {
            router.push(path)
          }
        }}
      >
        {children}
      </LayoutProfileWrapper>
      <AlertDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Estás seguro de salir</AlertDialogTitle>
            <AlertDialogDescription>
              Te recomendamos guardar los cambios antes de salir o cambiar de
              página. Recuerda que si sales sin guardar, perderás los cambios
              realizados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDialogAction()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
