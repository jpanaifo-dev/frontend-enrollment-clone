import { isDate, isValid, parse } from 'date-fns'

export // Función auxiliar para validar el formato de fecha (dd/mm/yyyy)
function isValidDateString(dateString: string): boolean {
  if (!dateString || dateString.trim() === '') return false

  const date = parse(dateString, 'dd/MM/yyyy', new Date())
  return isValid(date) && isDate(date)
}
