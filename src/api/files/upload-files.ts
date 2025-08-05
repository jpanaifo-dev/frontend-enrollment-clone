// import { IPersonFile } from '@/types'
// import { fetchPersonService } from '@/api/core'
// import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
// import { FilePesonSchemaType } from '@/modules/files'
// import { buildHeaders } from '../core/build-headers'

// const apiDataUrl = ENDPOINTS_CONFIG.PERSON

// export const uploapFilesPerson = async (
//   data: FilePesonSchemaType,
//   id: string | null = null
// ): Promise<{
//   status: number
//   data?: IPersonFile | null
//   errors?: string[]
// }> => {
//   const url = id ? `${apiDataUrl.PERSON_FILES}${id}/` : apiDataUrl.PERSON_FILES

//   const formData = new FormData()
//   for (const key in data) {
//     if (data[key as keyof FilePesonSchemaType] !== undefined) {
//       formData.append(key, data[key as keyof FilePesonSchemaType] as string)
//     }
//   }

//   const headers = await buildHeaders('PERSON')

//   try {
//     const response = id
//       ? await fetchPersonService.put(url, formData, true, headers)
//       : await fetchPersonService.post(url, formData, true, headers)

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
