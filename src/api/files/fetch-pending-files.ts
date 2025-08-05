// 'use server'
// import { IPersonFileRequirements } from '@/types'
// import { fetchFileService } from '@/api/core'
// import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
// const apiDataUrl = ENDPOINTS_CONFIG.FILE

// export const fetchFilesPending = async (
//   person_token: string
// ): Promise<{
//   status: number
//   data?: IPersonFileRequirements[]
//   errors?: string[]
// }> => {
//   const url = `${apiDataUrl.PERSON_FILES_PENDING}`

//   try {
//     const response = await fetchFileService.post(url, {
//       person_token
//     })

//     if (!response.ok) {
//       const errorResponse: {
//         [key: string]: string[]
//       } = await response.json()
//       const errorMessages = Object.values(errorResponse).flat()
//       return {
//         status: response.status,
//         errors: errorMessages,
//         data: []
//       }
//     }

//     const responseData: IPersonFileRequirements[] = await response.json()
//     return {
//       status: response.status,
//       data: responseData
//     }
//   } catch (error) {
//     console.error('Error al realizar la petición:', error)
//     return {
//       status: 500,
//       errors: ['Error al conectar con el servidor.'],
//       data: []
//     }
//   }
// }
