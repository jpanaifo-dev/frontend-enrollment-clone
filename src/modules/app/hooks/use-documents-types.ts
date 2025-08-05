'use client'
import { useState, useEffect } from 'react'
import { fetchDocumentsType } from '@/api/persons'
import { IDocumentType } from '@/types'

export const useDocumentTypes = () => {
  const [documentTypes, setDocumentTypes] = useState<IDocumentType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string[] | null>(null)

  useEffect(() => {
    const getDocumentTypes = async () => {
      const response = await fetchDocumentsType()
      if (response.status !== 200) {
        setError(
          response.errors || ['Error al obtener los tipos de documentos']
        )
        setLoading(false)
        return
      } else {
        setDocumentTypes(response.data || [])
      }
    }

    getDocumentTypes()
  }, [])

  return { documentTypes, loading, error }
}
