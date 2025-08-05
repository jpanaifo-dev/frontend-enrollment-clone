// import { IPersonLanguage } from '@/types'
// import { fetchPersonService } from '@/api/core'
// import { AcademicLanguageType } from '@/modules/admision'

// import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
// import { buildHeaders } from '../core/build-headers'

// const API_BASE = ENDPOINTS_CONFIG.PERSON.LANGUAGE_INFO

// const MESSAGES = {
//   CREATED: 'Información académica creada correctamente.',
//   UPDATED: 'Información académica actualizada correctamente.',
// }

// export const createOrUpdateLanguagePerson = async (
//   data: AcademicLanguageType,
//   id?: number
// ): Promise<{
//   status: number
//   data?: IPersonLanguage
//   errors?: string[]
//   message?: string
// }> => {
//   const url = `${API_BASE}`
//   const headers = await buildHeaders('PERSON')

//   const formData = new FormData()
//   for (const key in data) {
//     if (data[key as keyof AcademicLanguageType]) {
//       formData.append(key, data[key as keyof AcademicLanguageType])
//     }
//   }

//   try {
//     const response = id
//       ? await fetchPersonService.put(`${url}${id}/`, formData, true, headers)
//       : await fetchPersonService.post(url, formData, true, headers)
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
//     const responseData: IPersonLanguage = await response.json()
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
