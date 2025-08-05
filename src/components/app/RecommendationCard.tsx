interface RecommendationCardProps {
  title: string;
  description: string;
  icon: string;
}

const getIcon = (icon: string) => {
  switch (icon) {
    case 'calendar':
      return (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      );
    case 'document':
      return (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      );
    case 'credit-card':
      return (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      );
    default:
      return null;
  }
};

const RecommendationCard = ({ title, description, icon }: RecommendationCardProps) => (
  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
    <div className="flex items-start space-x-2">
      <div className="flex-shrink-0">
        <div className="w-12 h-7 rounded-lg flex items-center justify-center">
          {getIcon(icon)}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  </div>
);

export default RecommendationCard;
