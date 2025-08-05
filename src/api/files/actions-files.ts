import { fetchFileService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import { FileSchemaType } from '@/modules'
import { IFileListFilter, IFileList } from '../persons'
// import { buildHeaders } from '../core/build-headers'

const apiDataUrl = ENDPOINTS_CONFIG.FILE

export const fetchFilesList = async (
  filters?: IFileListFilter
): Promise<{
  status: number
  data?: IFileList[]
  errors?: string[]
}> => {
  const query = new URLSearchParams()
  if (filters) {
    for (const key in filters) {
      query.append(key, filters[key as keyof IFileListFilter]?.toString() || '')
    }
  }

  const url = `${apiDataUrl.FILES}?${query.toString()}`

  try {
    const response = await fetchFileService.get(url)
    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      return {
        status: response.status,
        errors: errorMessages,
        data: [],
      }
    }

    const responseData: IFileList[] = await response.json()
    return {
      status: response.status,
      data: responseData,
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
      data: [],
    }
  }
}

export const uploapFilesManager = async (
  data: Partial<FileSchemaType>,
  id: string | null = null
): Promise<{
  status: number
  data?: FileSchemaType | null
  errors?: string[]
}> => {
  const url = id ? `${apiDataUrl.FILES}${id}/` : apiDataUrl.FILES
  const formData = new FormData()
  for (const key in data) {
    if (data[key as keyof FileSchemaType] !== undefined) {
      if (key === 'file' && Array.isArray(data[key])) {
        formData.append(key, (data[key] as File[])[0])
      } else {
        formData.append(key, data[key as keyof FileSchemaType] as string)
      }
    }
  }

  try {
    const response = id
      ? await fetchFileService.put(url, formData, true)
      : await fetchFileService.post(url, formData, true)
    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      return {
        status: response.status,
        errors: errorMessages,
        data: null,
      }
    }

    const responseData: FileSchemaType = await response.json()
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
