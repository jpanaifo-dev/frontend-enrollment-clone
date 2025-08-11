import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { CardItem } from './cards.interface'
import { cn } from '@/lib/utils'

export const AcademicCard = ({
  title,
  description,
  icon,
  buttonText,
  buttonVariant = 'default',
  href,
  additionalInfo,
  isDisabled,
}: CardItem) => {
  return (
    <Card
      className={cn('border border-blue-500', {
        'cursor-not-allowed opacity-50': isDisabled,
      })}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Descripción puede ser string o string[] */}
        {typeof description === 'string' ? (
          <div className="flex items-center gap-2">
            {icon}
            <p className="text-sm text-slate-600">{description}</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-600">{description[0]}</p>
            <p className="text-sm text-slate-600">{description[1]}</p>
          </>
        )}

        {/* Información adicional */}
        {additionalInfo && (
          <div className="space-y-1 pt-2 text-sm text-slate-600">
            {additionalInfo.map((info, index) => (
              <p key={index}>{info}</p>
            ))}
          </div>
        )}

        {/* Botón con redirección */}
        {href && (
          <Link
            href={href}
            passHref
          >
            <Button
              variant={buttonVariant}
              className={`w-full ${
                buttonVariant === 'outline'
                  ? 'border-slate-200 text-slate-800 hover:bg-slate-50'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {buttonText || 'Acceder'}
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}
