import React from 'react'

type SkeletonBoxProps = {
  height?: string
  width?: string
  className?: string
}

const SkeletonBox = ({
  height = 'h-4',
  width = 'w-full',
  className = ''
}: SkeletonBoxProps) => (
  <div
    className={`bg-gray-200 rounded-md animate-pulse ${height} ${width} ${className}`}
  />
)

export const TableSkeleton = ({ rows = 3 }: { rows?: number }) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <div className="bg-gray-100 p-3 flex">
        <SkeletonBox width="w-1/5" />
        <SkeletonBox width="w-1/3" className="ml-4" />
        <SkeletonBox width="w-1/6" className="ml-4" />
        <SkeletonBox width="w-1/6" className="ml-4" />
        <SkeletonBox width="w-1/12" className="ml-4" />
      </div>
      <div className="divide-y">
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} className="p-4 flex items-center">
            <SkeletonBox width="w-1/5" />
            <SkeletonBox width="w-1/3" className="ml-4" />
            <SkeletonBox width="w-1/6" className="ml-4" />
            <SkeletonBox width="w-1/6" className="ml-4" />
            <div className="flex gap-2 ml-4">
              <SkeletonBox width="w-6" height="h-6" className="rounded" />
              <SkeletonBox width="w-6" height="h-6" className="rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
