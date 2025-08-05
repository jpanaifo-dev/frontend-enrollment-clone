import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

export interface Step {
  title: string
  description?: string
}

interface StepsProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export const Steps = ({ steps, currentStep, className }: StepsProps) => {
  return (
    <div className={cn('w-full', className)}>
      <div className="relative flex w-full justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > index + 1
          const isActive = currentStep === index + 1

          return (
            <div
              key={step.title}
              className="flex flex-1 flex-col items-center relative last:flex-none"
            >
              {/* Contenedor del paso */}
              <div className="flex flex-col items-center relative z-10 w-full px-2">
                {/* Línea de conexión - ocupa todo el espacio disponible */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'absolute top-5 left-[calc(50%+20px)] right-[calc(-50%+20px)] h-1 -z-10 transition-colors duration-300',
                      isCompleted ? 'bg-blue-800' : 'bg-gray-200'
                    )}
                  />
                )}

                {/* Círculo */}
                <div
                  className={cn(
                    'w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold text-sm transition-colors duration-300 shrink-0',
                    isCompleted
                      ? 'bg-blue-800 border-blue-800 text-white'
                      : isActive
                      ? 'border-blue-800 bg-white text-blue-800'
                      : 'border-gray-200 bg-gray-100 text-gray-400'
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
                </div>

                {/* Texto */}
                <div className="mt-3 text-center w-full px-2">
                  <h3
                    className={cn(
                      'text-sm font-semibold',
                      isActive
                        ? 'text-blue-800'
                        : isCompleted
                        ? 'text-gray-900'
                        : 'text-gray-400'
                    )}
                  >
                    {step.title}
                  </h3>
                  {step.description && (
                    <p
                      className={cn(
                        'text-xs mt-1',
                        isActive || isCompleted
                          ? 'text-gray-600'
                          : 'text-gray-400'
                      )}
                    >
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
