'use client'

import { useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

interface IQueryParams {
  key: string
  value: string
}

type IRemoveFilter = Omit<IQueryParams, 'value'>

export const useFilterFromUrl = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const getParams = ({ key, value }: IQueryParams) => {
    const result = searchParams.get(key)
    return result || value
  }

  const updateFilter = useCallback(
    (filters: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams)

      Object.entries(filters).forEach(([key, value]) => {
        if (value === null || value === '') {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      })

      const queryString = params.toString()
      const url = `${pathname}${queryString ? `?${queryString}` : ''}`

      router.push(url)
    },
    [searchParams, router, pathname]
  )

  const createFilter = useCallback(
    ({ key, value }: IQueryParams) => {
      const params = new URLSearchParams(searchParams.toString())

      // Set the new filter
      params.set(key, value)

      const queryString = params.toString()
      const url = `${pathname}${queryString ? `?${queryString}` : ''}`

      router.push(url)
    },
    [searchParams, router, pathname]
  )

  const removeFilter = useCallback(
    ({ key }: IRemoveFilter) => {
      const params = new URLSearchParams(searchParams)

      // Remove the filter
      params.delete(key)

      const queryString = params.toString()
      const url = `${pathname}${queryString ? `?${queryString}` : ''}`

      router.push(url)
    },
    [searchParams, router, pathname]
  )

  return {
    getParams,
    updateFilter,
    createFilter,
    removeFilter
  }
}
