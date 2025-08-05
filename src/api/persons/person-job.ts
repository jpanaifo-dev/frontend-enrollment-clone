// 'use server'
// import {
//   IPersonJob,
//   IPersonJobFilter,
//   IJobSector,
//   IPersonJobList
// } from '@/types'

// import { fetchPersonService } from '@/api/core'
// import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'

// const apiDataUrl = ENDPOINTS_CONFIG.PERSON

// export const fetchPersonsJob = async (
//   filters?: IPersonJobFilter
// ): Promise<{
//   status: number
//   data?: IPersonJob[]
//   errors?: string[]
// }> => {
//   const queryParams = new URLSearchParams()
//   if (filters) {
//     for (const key in filters) {
//       queryParams.append(key, filters[key as keyof IPersonJobFilter] as string)
//     }
//   }

//   const URL_API = apiDataUrl.JOB_INFO

//   const url = `${URL_API}?${queryParams.toString()}`

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
//         data: []
//       }
//     }

//     // Si el estado es exitoso, parseamos los datos
//     const responseData: IPersonJob[] = await response.json()
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

// export const fetchPersonsJobList = async (
//   filters?: IPersonJobFilter
// ): Promise<{
//   status: number
//   data?: IPersonJobList[]
//   errors?: string[]
// }> => {
//   const queryParams = new URLSearchParams()
//   if (filters) {
//     for (const key in filters) {
//       queryParams.append(key, filters[key as keyof IPersonJobFilter] as string)
//     }
//   }

//   const url = `${apiDataUrl.JOB_INFO_LIST}?${queryParams.toString()}`

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
//         data: []
//       }
//     }

//     // Si el estado es exitoso, parseamos los datos
//     const responseData: IPersonJobList[] = await response.json()
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

// export const fetchJobsectors = async (): Promise<{
//   status: number
//   data?: IJobSector[]
//   errors?: string[]
// }> => {
//   const url = `${ENDPOINTS_CONFIG.PERSON.JOB_SECTOR}`

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
//         data: []
//       }
//     }

//     // Si el estado es exitoso, parseamos los datos
//     const responseData: IJobSector[] = await response.json()
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
