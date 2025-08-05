'use server'
import { fetchAcademicService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import { PaymentValidateFormValues } from '@/modules/matricula/schema/payment.validate.schema'
import { IPaymentValidation } from '@/types'

const API_BASE = ENDPOINTS_CONFIG.ACADEMIC

export const validatePay = async (
  data: PaymentValidateFormValues
): Promise<{
  status: number
  data?: IPaymentValidation | null
  errors?: string[]
}> => {
  const url = `${API_BASE.ENROLLMENT_VALIDATE}`

  const formattedDate = new Date(data.date).toISOString().split('T')[0]
  const body = {
    document_number: data.document_number,
    operation_number: data.operation_number,
    date: formattedDate,
  }

  try {
    const response = await fetchAcademicService.post(url, body)

    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      console.error('Error al validar el pago:', errorResponse)
      const errorMessages = Object.values(errorResponse).flat()
      // console.error('Error al validar el pago:', errorMessages)
      return {
        status: response.status,
        errors: errorMessages,
        data: null,
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IPaymentValidation = await response.json()
    return {
      status: response.status,
      data: responseData,
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
      data: null,
    }
  }
}
