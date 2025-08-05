import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Loading() {
  return (
    <div className="max-w-5xl border-none p-0 space-y-8">
      {/* Personal Data Section */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
          <Skeleton className="h-4 w-96 mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Photo Upload Area */}
          <div className="flex justify-center">
            <Skeleton className="h-40 w-40 rounded-lg" />
          </div>

          {/* Document Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Name Fields */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Surname Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Gender and Civil Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Origin and Birth Section */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-72" />
          </CardTitle>
          <Skeleton className="h-4 w-96 mt-2" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Demographic Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-64" />
          </CardTitle>
          <Skeleton className="h-4 w-96 mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Language Options */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-32" />
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-2"
                >
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>

          {/* Indigenous Community */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Disability */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-40" />
          </div>

          {/* Update Button */}
          <div className="flex justify-end">
            <Skeleton className="h-10 w-32" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
