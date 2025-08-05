export interface AcademicPayment {
  id: number
  uuid: string
  student_file_uuid: string | null
  client_name: string
  document_number: string
  operation_number: string
  date: string // ISO date string
  amount: string
  is_active: boolean
  is_conciliate: boolean
  conciliate_number: string | null
  paid_file: string | null
  is_imported: boolean
  is_validated: boolean
  observation: string | null
  created_at: string // ISO date string
  updated_at: string // ISO date string
  concept: number
}

export interface EconomicFilter {
  uuid?: string
  document_number?: string
  document_number__icontains?: string
  operation_number?: string
  operation_number__icontains?: string
  client_name?: string
  client_name__icontains?: string
  date?: string
  date__gte?: string
  date__lte?: string
  concept__name?: string
  concept__name__icontains?: string
  concept__code?: string | number
  concept__code__icontains?: string
  is_active?: boolean
}

export interface AcademicConcept {
  id: number
  name: string
  code: string
  price: string
  is_active: boolean
  is_admission: boolean
}
