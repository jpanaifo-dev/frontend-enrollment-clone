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
    <div className={cn('w-full max-w-full overflow-x-auto', className)}>
      <div className="relative flex w-full justify-center">
        <div className="flex w-full max-w-4xl justify-between">
          {steps.map((step, index) => {
            const isCompleted = currentStep > index + 1
            const isActive = currentStep === index + 1
            const isLastStep = index === steps.length - 1

            return (
              <div
                key={step.title}
                className={cn(
                  'flex flex-col items-center relative',
                  isLastStep ? 'flex-none' : 'flex-1'
                )}
              >
                {/* Contenedor del paso */}
                <div className="flex flex-col items-center relative z-10 w-full px-2">
                  {/* Línea de conexión - solo si no es el último paso */}
                  {!isLastStep && (
                    <div
                      className={cn(
                        'absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-px',
                        isCompleted ? 'bg-blue-600' : 'bg-gray-200'
                      )}
                    />
                  )}

                  {/* Círculo */}
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold text-sm transition-colors duration-300 shrink-0',
                      isCompleted
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : isActive
                        ? 'border-blue-600 bg-white text-blue-600'
                        : 'border-gray-200 bg-gray-100 text-gray-400'
                    )}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
                  </div>

                  {/* Texto */}
                  <div className="mt-3 text-center w-full px-2">
                    <h3
                      className={cn(
                        'text-sm font-semibold line-clamp-1',
                        isActive
                          ? 'text-blue-600'
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
                          'text-xs mt-1 line-clamp-2',
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
    </div>
  )
}
