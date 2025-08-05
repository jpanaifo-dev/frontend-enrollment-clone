export interface IPaymentValidation {
  id: number
  uuid: string
  student_file_uuid: string | null
  client_name: string
  document_number: string
  operation_number: string
  date: string
  amount: string
  is_active: boolean
  is_conciliate: boolean
  conciliate_number: string | null
  paid_file: string | null
  concept: number
}
