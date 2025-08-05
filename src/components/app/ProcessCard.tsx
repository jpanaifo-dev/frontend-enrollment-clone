import { CalendarRange } from 'lucide-react';

interface ProcessCardProps {
  title: string;
  description: string;
  date: string;
  borderColor: string;
  textColor: string;
}

const ProcessCard = ({
  title,
  description,
  date,
  borderColor,
  textColor,
}: ProcessCardProps) => (
  <div className={`bg-white rounded-lg p-6 shadow-sm border ${borderColor}`}>
    <h3 className={`text-lg font-semibold ${textColor} mb-3`}>{title}</h3>
    <p className="text-gray-500 text-sm mb-6">{description}</p>
    <div className={`border-l-4 ${borderColor.split(' ')[1]} pl-4`}>
      <div className="flex items-center space-x-2 mb-2">
        <CalendarRange size={16} />
        <span className="text-xs text-gray-500 uppercase tracking-wide">
          {title.includes('extemporánea')
            ? 'PERÍODO EXTEMPORÁNEO:'
            : title.includes('regular')
            ? 'PERÍODO REGULAR:'
            : 'FECHAS DISPONIBLES:'}
        </span>
      </div>
      <div className={`text-lg font-semibold ${textColor} px-8`}>{date}</div>
    </div>
  </div>
);

export default ProcessCard;
