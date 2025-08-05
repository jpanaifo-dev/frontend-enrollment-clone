import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface DocumentCardProps {
  title: string;
  description: string;
  url: string;
  disabled?: boolean;
}

const DocumentCard = ({ title, description, url, disabled = false }: DocumentCardProps) => (
  <div className="bg-gray-50 rounded-lg p-6 border border-gray-300 max-w-md w-full mx-auto">
    <div className="text-left">
      <h3 className="text-lg font-semibold text-blue-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <Button
        variant="outline"
        className="text-blue-600 border-blue-600 hover:bg-blue-50 w-full"
        disabled={disabled}
        asChild={!disabled}
      >
        {disabled ? (
          <div className="flex items-center justify-between">
            Descargar {title.toLowerCase()}
            <Download />
          </div>
        ) : (
          <Link
            href={url}
            target="_blank"
            className="flex items-center justify-between"
          >
            Descargar {title.toLowerCase()}
            <Download />
          </Link>
        )}
      </Button>
    </div>
  </div>
);

export default DocumentCard;
