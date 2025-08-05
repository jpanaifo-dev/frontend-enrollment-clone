'use client'
import {
  checkStrength,
  getStrengthColor,
  getStrengthText,
} from '@/modules/auth'
import { CheckIcon, Eye, EyeOff, XIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Input } from '../ui/input'

interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  setShowPassword?: (value: boolean) => void
  showPassword?: boolean
  strengthBar?: boolean
  barActive?: boolean
}

export const InputPassword = ({
  value,
  setShowPassword,
  strengthBar = false,
  showPassword: controlledShowPassword,
  ...props
}: InputPasswordProps) => {
  const [uncontrolledShowPassword, setUncontrolledShowPassword] =
    useState(false)
  const showPassword = controlledShowPassword ?? uncontrolledShowPassword
  const toggleShowPassword = () =>
    setShowPassword
      ? setShowPassword(!showPassword)
      : setUncontrolledShowPassword(!showPassword)

  const strength = checkStrength(value)
  const strengthScore = useMemo(
    () => strength.filter((req) => req.met).length,
    [strength]
  )

  return (
    <>
      <div className="relative">
        <Input
          {...props}
          value={value}
          type={showPassword ? 'text' : 'password'}
          aria-invalid={strengthScore < 4}
          aria-describedby="password-strength"
        />
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={toggleShowPassword}
          aria-label={
            showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
          }
          aria-pressed={showPassword}
        >
          {showPassword ? (
            <EyeOff
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          ) : (
            <Eye
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          )}
        </button>
      </div>
      {!strengthBar && (
        <>
          {/* Barra de fortaleza */}
          <div className="bg-border mt-3 mb-4 h-1 w-full overflow-hidden rounded-full">
            <div
              className={`h-full ${getStrengthColor(
                strengthScore
              )} transition-all duration-500`}
              style={{ width: `${(strengthScore / 4) * 100}%` }}
            ></div>
          </div>

          {/* Indicador de fortaleza */}
          <p className="text-sm font-medium">
            {getStrengthText(strengthScore)}. Debe contener:
          </p>
          <ul className="space-y-1.5">
            {strength.map((req, index) => (
              <li
                key={index}
                className="flex items-center gap-2"
              >
                {req.met ? (
                  <CheckIcon
                    size={16}
                    className="text-emerald-500"
                  />
                ) : (
                  <XIcon
                    size={16}
                    className="text-muted-foreground/80"
                  />
                )}
                <span
                  className={`${
                    req.met ? 'text-emerald-600' : 'text-muted-foreground'
                  } text-xs`}
                >
                  {req.text}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
