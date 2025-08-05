// 'use server'
// import { IPersonFile } from '@/types'
// import { fetchPersonService } from '@/api/core'
// import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
// import { revalidatePath } from 'next/cache'
// import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'

// const apiDataUrl = ENDPOINTS_CONFIG.PERSON

// interface IFileFilter {
//   file_Type?: number
//   person_token?: string
//   is_active?: boolean
// }

// export const fetchPersonFiles = async (
//   filters?: IFileFilter
// ): Promise<{
//   status: number
//   data?: IPersonFile[]
//   errors?: string[]
// }> => {
//   const query = new URLSearchParams()
//   if (filters) {
//     for (const key in filters) {
//       query.append(key, filters[key as keyof IFileFilter]?.toString() || '')
//     }
//   }

//   const url = `${apiDataUrl.PERSON_FILES}?${query.toString()}`

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

//     const responseData: IPersonFile[] = await response.json()
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

// export const changePersonFileStatus = async (
//   fileId: string,
//   status: boolean,
//   file_Type: string
// ): Promise<{
//   status: number
//   data?: IPersonFile | null
//   errors?: string[]
// }> => {
//   const url = `${apiDataUrl.PERSON_FILES}${fileId}/`

//   try {
//     const response = await fetchPersonService.put(url, { is_active: status })

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

//     const responseData: IPersonFile = await response.json()
//     revalidatePath(ADMISSION_URLS_APP.FILES.FILE_TYPE(file_Type))
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
