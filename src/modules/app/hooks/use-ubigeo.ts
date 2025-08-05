'use client'
import { useState } from 'react'
import { fetchUbigeo, fetchUbigeoFilterData } from '@/api/location'
import { IUbigeo, IUbigeoFilterDataQuery } from '@/types'

export const useUbigeo = () => {
  const [ubigeoList, setUbigeoList] = useState<IUbigeo[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string[] | null>(null)

  const getUbigeoList = async () => {
    const response = await fetchUbigeo({})
    if (response.status !== 200) {
      setError(response.errors || ['Error al obtener los tipos de documentos'])
      setLoading(false)
      return
    } else {
      setUbigeoList(response.data || [])
      setLoading(false)
    }
  }

  const getUbigeoFilterData = async (filter: IUbigeoFilterDataQuery) => {
    const response = await fetchUbigeoFilterData(filter)
    if (response.status !== 200) {
      setError(response.errors || ['Error al obtener los tipos de documentos'])
      setLoading(false)
      return
    } else {
      setUbigeoList(response.data || [])
      setLoading(false)
    }
  }

  return { ubigeoList, loading, error, getUbigeoFilterData, getUbigeoList }
}
