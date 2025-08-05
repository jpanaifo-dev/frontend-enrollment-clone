import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Loading() {
  return (
    <Card className="max-w-5xl p-0 border-none">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-48" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Address and Location Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Additional Email */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-72" />
        </div>

        {/* Phone Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 flex-1" />
            </div>
          </div>
        </div>

        {/* LinkedIn */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-56" />
        </div>

        {/* Update Button */}
        <div className="flex justify-end mt-6">
          <Skeleton className="h-10 w-32" />
        </div>
      </CardContent>
    </Card>
  )
}
