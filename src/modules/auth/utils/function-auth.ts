export const getStrengthColor = (score: number) => {
  if (score === 0) return 'bg-border'
  if (score <= 1) return 'bg-red-500'
  if (score <= 2) return 'bg-orange-500'
  if (score === 3) return 'bg-amber-500'
  return 'bg-emerald-500'
}

export const getStrengthText = (score: number) => {
  if (score === 0) return 'Introduce una contraseña'
  if (score <= 2) return 'Contraseña débil'
  if (score === 3) return 'Contraseña media'
  return 'Contraseña fuerte'
}

export const checkStrength = (pass: string) => {
  const requirements = [
    { regex: /.{8,}/, text: 'Al menos 8 caracteres' },
    { regex: /[0-9]/, text: 'Al menos 1 número' },
    { regex: /[a-z]/, text: 'Al menos 1 letra minúscula' },
    { regex: /[A-Z]/, text: 'Al menos 1 letra mayúscula' },
  ]

  return requirements.map((req) => ({
    met: req.regex.test(pass),
    text: req.text,
  }))
}
