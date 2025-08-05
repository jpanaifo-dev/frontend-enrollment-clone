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
          {studentInfo.program_code}
        </Badge>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          {studentInfo.program_name}
        </h2>
      </div>

      {/* Program Details */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            Modalidad
          </div>
          <div className="font-medium text-gray-900">
            {studentInfo.modality_name}
          </div>
        </div>

        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            Unidad
          </div>
          <div className="font-medium text-gray-900">
            {studentInfo.unity_name}
          </div>
        </div>

        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            Plan de estudios
          </div>
          <div className="font-medium text-gray-900">
            {studentInfo.plan_study_description}
          </div>
        </div>
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
              {studentInfo.person_name}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <IdCard className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Código de alumno
            </div>
            <div className="font-medium text-gray-900">
              {studentInfo.university_code}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
