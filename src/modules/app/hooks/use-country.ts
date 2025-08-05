'use client'
import { useState } from 'react'
import { fetchCountry, fetchCountryFilterData } from '@/api/location'
import { ICountry } from '@/types'

export const useCountry = () => {
  const [countryList, setCountryList] = useState<ICountry[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string[] | null>(null)

  const getUbigeoList = async () => {
    const response = await fetchCountry()
    if (response.status !== 200) {
      setError(response.errors || ['Error al obtener los tipos de documentos'])
      setLoading(false)
      return
    } else {
      setCountryList(response.data || [])
      setLoading(false)
    }
  }

  const getCountryFilterData = async (query: string) => {
    const response = await fetchCountryFilterData(query)
    if (response.status !== 200) {
      setError(response.errors || ['Error al obtener los tipos de documentos'])
      return
    } else {
      setCountryList(response.data || [])
    }
  }

  return { countryList, loading, error, getCountryFilterData, getUbigeoList }
}
