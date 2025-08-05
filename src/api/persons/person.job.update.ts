// 'use server'
// import { fetchPersonService } from '@/api/core'
// import { IPersonJob } from '@/types'
// import { PersonJobType } from '@/modules/admision'

// import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
// import { buildHeaders } from '../core/build-headers'
// import { revalidatePath } from 'next/cache'

// const API_BASE = ENDPOINTS_CONFIG.PERSON.JOB_INFO

// const MESSAGES = {
//   CREATED: 'Información académica creada correctamente.',
//   UPDATED: 'Información académica actualizada correctamente.',
// }

// export const createOrUpdateJobPerson = async (
//   data: PersonJobType,
//   id?: number
// ): Promise<{
//   status: number
//   data?: IPersonJob
//   errors?: string[]
//   message?: string
// }> => {
//   const url = `${API_BASE}`
//   const headers = await buildHeaders('PERSON')

//   try {
//     const response = id
//       ? await fetchPersonService.put(`${url}${id}/`, data, false, headers)
//       : await fetchPersonService.post(url, data, false, headers)

//     if (!response.ok) {
//       const errorResponse: {
//         [key: string]: string[]
//       } = await response.json()
//       const errorMessages = Object.entries(errorResponse).map(
//         ([key, value]) => `${key}: ${value.join(', ')}`
//       )
//       return {
//         status: response.status,
//         errors: errorMessages,
//         data: undefined,
//       }
//     }
//     // Si el estado es exitoso, parseamos los datos
//     const responseData: IPersonJob = await response.json()
//     revalidatePath('/admision/informacion-personal/laboral')
//     return {
//       status: response.status,
//       errors: undefined,
//       data: responseData,
//       message: id ? MESSAGES.UPDATED : MESSAGES.CREATED,
//     }
//   } catch (error) {
//     console.error('Error al realizar la petición:', error)
//     return {
//       status: 500,
//       errors: ['Error al conectar con el servidor.'],
//       data: undefined,
//     }
//   }
// }
