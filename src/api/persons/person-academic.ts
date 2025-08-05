// 'use server'
// import {
//   IPersonAcademic,
//   IPersonAcademicFilter,
//   IAcademicDegree,
//   IPersonAcademicList,
// } from '@/types'

// import { fetchPersonService } from '@/api/core'
// import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'

// const apiDataUrl = ENDPOINTS_CONFIG.PERSON

// export const fetchPersonsAcademic = async (
//   filters?: IPersonAcademicFilter
// ): Promise<{
//   status: number
//   data?: IPersonAcademic[]
//   errors?: string[]
// }> => {
//   const queryParams = new URLSearchParams()
//   if (filters) {
//     for (const key in filters) {
//       queryParams.append(
//         key,
//         filters[key as keyof IPersonAcademicFilter] as string
//       )
//     }
//   }

//   const url = `${apiDataUrl.ACADEMIC_INFO}?${queryParams.toString()}`

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
//     const responseData: IPersonAcademic[] = await response.json()
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

// export const fetchPersonsAcademicList = async (
//   filters?: IPersonAcademicFilter
// ): Promise<{
//   status: number
//   data?: IPersonAcademicList[]
//   errors?: string[]
// }> => {
//   const queryParams = new URLSearchParams()
//   if (filters) {
//     for (const key in filters) {
//       queryParams.append(
//         key,
//         filters[key as keyof IPersonAcademicFilter] as string
//       )
//     }
//   }

//   const url = `${apiDataUrl.ACADEMIC_INFO_LIST}?${queryParams.toString()}`

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
//     const responseData: IPersonAcademicList[] = await response.json()
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

// export const fetchAcademicDegrees = async (): Promise<{
//   status: number
//   data?: IAcademicDegree[]
//   errors?: string[]
// }> => {
//   const url = `${apiDataUrl.ACADEMIC_DEGREE}`

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
//     const responseData: IAcademicDegree[] = await response.json()
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
