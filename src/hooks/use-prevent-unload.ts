'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const usePreventUnload = (isDirty: boolean) => {
  const router = useRouter()

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
      }
    }

    const handlePopState = (event: PopStateEvent) => {
      if (
        isDirty &&
        !window.confirm(
          'Tienes cambios sin guardar. ¿Seguro que quieres salir?'
        )
      ) {
        event.preventDefault()
        router.push(window.location.pathname) // Mantiene al usuario en la página
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [isDirty, router])
}
