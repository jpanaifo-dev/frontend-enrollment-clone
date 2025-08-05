'use client'
import { useState, useEffect } from 'react'
import { fetchMaritalStatus } from '@/api/persons'
import { IMaritalStatus } from '@/types'

export const useMaritalStatus = () => {
  const [maritalStatus, setMaritalStatus] = useState<IMaritalStatus[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string[] | null>(null)

  useEffect(() => {
    const getDocumentTypes = async () => {
      const response = await fetchMaritalStatus()
      if (response.status !== 200) {
        setError(
          response.errors || ['Error al obtener los tipos de documentos']
        )
        setLoading(false)
        return
      } else {
        setMaritalStatus(response.data || [])
      }
    }

    getDocumentTypes()
  }, [])

  return { maritalStatus, loading, error }
}
