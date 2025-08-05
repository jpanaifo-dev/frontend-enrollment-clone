/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { fetchRefreshSession } from '@/api/auth'
import { usePathname } from 'next/navigation'
import { AUTH_URLS_APP } from '@/config/urls-data'

export const TokenExpirationModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  const isAdminPath = pathname.includes('/dashboard')
  const isAdmissionPath = pathname.includes('/admision')

  const URL_REDIRECT = isAdminPath
    ? AUTH_URLS_APP.LOGIN.URL_BASE
    : isAdmissionPath
    ? AUTH_URLS_APP.LOGIN.URL_BASE
    : '/'

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await fetch('/api/auth/session_user')
        if (!response.ok) throw new Error('No autorizado')
        const sessionData = await response.json()
        if (sessionData?.access_token) {
          setToken(sessionData.access_token)
        }
      } catch (error) {
        console.error('Error obteniendo la sesión:', error)
        logout()
      }
    }

    fetchAuth()
  }, [])

  useEffect(() => {
    if (!token) return

    try {
      const tokenData = JSON.parse(atob(token.split('.')[1])) // Decodifica el JWT
      const expTime = tokenData.exp * 1000 // Convierte a milisegundos
      const warningTime = expTime - 2 * 60 * 1000 // 2 minutos antes de expirar

      const checkToken = () => {
        const now = Date.now()
        if (now >= warningTime && now < expTime) {
          setIsOpen(true) // Abre el modal
        } else if (now >= expTime) {
          logout() // Cierra sesión automáticamente si expira
        }
      }

      const interval = setInterval(checkToken, 10000) // Revisa cada 10s

      return () => clearInterval(interval)
    } catch (error) {
      console.error('Error al decodificar el token:', error)
    }
  }, [token])

  const refreshToken = async () => {
    try {
      const response = await fetchRefreshSession()
      if (response.data && !response.errors) {
        setToken(response.data.access_token)
        setIsOpen(false)
      } else {
        logout()
      }
    } catch (error) {
      console.error('Error al renovar token:', error)
      logout()
    }
  }

  const logout = async () => {
    setToken(null)
    const deleteSession = async () => {
      try {
        const response = await fetch(
          `/api/auth/logout?url=${encodeURIComponent(URL_REDIRECT)}`,
          {
            method: 'DELETE',
          }
        )
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

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>⚠️ Sesión por expirar</DialogTitle>
          <DialogDescription>
            Tu sesión está por expirar, ¿quieres continuar?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button
            variant="destructive"
            onClick={logout}
            type="button"
          >
            Cerrar sesión
          </Button>
          <Button
            variant="ghost"
            type="button"
            onClick={refreshToken}
          >
            Continuar sesión
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
