import { Badge } from '@/components/ui/badge'
import { IStudentDetails } from '@/types'
import { User, BadgeIcon as IdCard } from 'lucide-react'

interface StudentInfoCardProps {
  studentInfo: IStudentDetails
}

export const StudentInfoCard = ({ studentInfo }: StudentInfoCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-fit text-sm sticky lg:top-80 z-10">
      {/* Header */}
      <div className="mb-6">
        <Badge
          className="rounded-full px-2
        bg-gray-500 hover:bg-gray-400 text-xs
        "
        >
          {studentInfo.program?.code}
        </Badge>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          {studentInfo.program?.name}
        </h2>
        <p>{studentInfo.program?.description || 'No description available'}</p>
      </div>

      {/* Student Information */}
      <div className="pt-4 border-t border-gray-100 space-y-4">
        <div className="flex items-start gap-3">
          <User className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Alumno
            </div>
            <div className="font-medium text-gray-900">
              {`${studentInfo.person?.last_name1} ${studentInfo.person?.last_name2} ${studentInfo.person?.names}`}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <IdCard className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Código de alumno
            </div>
            <div className="font-medium text-gray-900">{studentInfo.code}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
