import { TableSkeleton } from '@/components/app'
import React from 'react'

export default function Loading() {
  return (
    <>
      <TableSkeleton rows={7} />
    </>
  )
}
