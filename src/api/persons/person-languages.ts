// 'use server'
// import { IPersonLanguage, IPersonLanguageFilter } from '@/types'

// import { fetchPersonService } from '@/api/core'
// import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'

// const apiDataUrl = ENDPOINTS_CONFIG.PERSON.LANGUAGE_INFO

// export const fetchPersonsLanguage = async (
//   filters?: IPersonLanguageFilter
// ): Promise<{
//   status: number
//   data?: IPersonLanguage[]
//   errors?: string[]
// }> => {
//   const queryParams = new URLSearchParams()
//   if (filters) {
//     for (const key in filters) {
//       queryParams.append(
//         key,
//         filters[key as keyof IPersonLanguageFilter] as string
//       )
//     }
//   }

//   const url = `${apiDataUrl}?${queryParams.toString()}`

//   try {
//     const response = await fetchPersonService.get(url)

//     if (!response.ok) {
//       const errorResponse: {
//         [key: string]: string[]
//       } = await response.json()
//       const errorMessages = Object.values(errorResponse).flat()
//       return {
//         status: response.status,
//         errors: errorMessages,
//         data: [],
//       }
//     }

//     // Si el estado es exitoso, parseamos los datos
//     const responseData: IPersonLanguage[] = await response.json()
//     return {
//       status: response.status,
//       data: responseData,
//     }
//   } catch (error) {
//     console.error('Error al realizar la petición:', error)
//     return {
//       status: 500,
//       errors: ['Error al conectar con el servidor.'],
//       data: [],
//     }
//   }
// }
