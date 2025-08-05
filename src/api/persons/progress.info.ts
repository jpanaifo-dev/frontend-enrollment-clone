// 'use server'
// import { IProgressInfo, IProgressInfoFilter } from '@/types'

// import { fetchPersonService } from '@/api/core'
// import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'

// const URL_BASE = ENDPOINTS_CONFIG.PERSON

// export const fetchProgressInfo = async (
//   data: IProgressInfoFilter
// ): Promise<{
//   status: number
//   data?: IProgressInfo | null
//   errors?: string[]
// }> => {
//   const url = `${URL_BASE.PROGRESS_INFO}`

//   try {
//     const response = await fetchPersonService.post(url, data)

//     if (!response.ok) {
//       const errorResponse: {
//         [key: string]: string[]
//       } = await response.json()
//       const errorMessages = Object.values(errorResponse).flat()
//       return {
//         status: response.status,
//         errors: errorMessages,
//         data: null,
//       }
//     }

//     // Si el estado es exitoso, parseamos los datos
//     const responseData: IProgressInfo = await response.json()
//     return {
//       status: response.status,
//       data: responseData,
//     }
//   } catch (error) {
//     console.error('Error al realizar la petición:', error)
//     return {
//       status: 500,
//       errors: ['Error al conectar con el servidor.'],
//       data: null,
//     }
//   }
// }
