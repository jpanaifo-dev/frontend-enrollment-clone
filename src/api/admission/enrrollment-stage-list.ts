'use server'
import { fetchAcademicService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import {
  IEnrollmentStage,
  IStudentDetails,
  IStudentProgram,
  StudentData,
  IEnrollmentList,
} from '@/types'

const API_BASE = ENDPOINTS_CONFIG.ACADEMIC

export const fetchEnrrollmentStageList = async ({
  person_uuid,
}: {
  person_uuid: string
}): Promise<{
  status: number
  data?: IEnrollmentStage[] | null
  errors?: string[]
}> => {
  const url = `${API_BASE.ENROLLMENT_STAGE_PERSON}?person_token=${person_uuid}`

  try {
    const response = await fetchAcademicService.get(url)
    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      console.error('error matricula:', errorResponse)
      const errorMessages = Object.values(errorResponse).flat()
      console.error('error matricula:', errorMessages)
      return {
        status: response.status,
        errors: errorMessages,
        data: null,
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IEnrollmentStage[] = await response.json()
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

export const fetchProgramsStudent = async ({
  person_uuid,
}: {
  person_uuid: string
}): Promise<{
  status: number
  data?: IStudentProgram[] | null
  errors?: string[]
}> => {
  const url = `${API_BASE.STUDENT_FILE_PROGRAMS}?person_token=${person_uuid}`

  try {
    const response = await fetchAcademicService.get(url)
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

    const responseData: IStudentProgram[] = await response.json()
    return {
      status: response.status,
      data: responseData,
    }
  } catch (error) {
    console.error('Error al obtener los programas de matrícula:', error)
    return {
      status: 500,
      errors: ['Error al obtener los programas de matrícula.'],
      data: null,
    }
  }
}

export const fetchEnrollmentStageBy = async ({
  stage_uuid,
}: {
  stage_uuid: string
}): Promise<{
  status: number
  data?: IEnrollmentStage | null
  errors?: string[]
}> => {
  const url = `${API_BASE.ENROLLMENT_STAGE}${stage_uuid}/`

  try {
    const response = await fetchAcademicService.get(url)
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

    const responseData: IEnrollmentStage = await response.json()
    return {
      status: response.status,
      data: responseData,
    }
  } catch {
    return {
      status: 500,
      errors: ['Error al obtener la data de matricula.'],
      data: null,
    }
  }
}

export const fetchDetailsStudentFile = async ({
  student_file_uuid,
}: {
  student_file_uuid: string
}): Promise<{
  status: number
  data?: IStudentDetails | null
  errors?: string[]
}> => {
  const url = `${API_BASE.DETAILS_STUDENT_FILE}?student_token=${student_file_uuid}`

  try {
    const response = await fetchAcademicService.get(url)
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

    const responseData = await response.json()
    return {
      status: response.status,
      data: responseData[0],
    }
  } catch (error) {
    console.error(
      'Error al obtener los detalles del archivo del alumno:',
      error
    )
    return {
      status: 500,
      errors: ['Error al obtener los detalles del archivo del alumno.'],
      data: null,
    }
  }
}

export const fetchDetailsStudentEnrollment = async ({
  enrollment_id,
}: {
  enrollment_id: string
}): Promise<{
  status: number
  data?: StudentData | null
  errors?: string[]
}> => {
  const url = `${API_BASE.DETAILS_ENROLLMENT}?enrollment_id=${enrollment_id}`

  try {
    const response = await fetchAcademicService.get(url)
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

    const responseData = await response.json()
    return {
      status: response.status,
      data: responseData,
    }
  } catch (error) {
    console.error(
      'Error al obtener los detalles de la matrícula del alumno:',
      error
    )
    return {
      status: 500,
      errors: ['Error al obtener los detalles de la matrícula del alumno.'],
      data: null,
    }
  }
}

export const fetchStudentEnrollmentList = async ({
  student_uuid,
}: {
  student_uuid: string
}): Promise<{
  status: number
  data?: IEnrollmentList[] | null
  errors?: string[]
}> => {
  const url = `${API_BASE.ENROLLMENT_LIST}?student_uuid=${student_uuid}`

  try {
    const response = await fetchAcademicService.get(url)
  
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

    const responseData = await response.json()
    return {
      status: response.status,
      data: responseData,
    }
  } catch (error) {
    console.error('Error al obtener la lista de matrículas del alumno:', error)
    return {
      status: 500,
      errors: ['Error al obtener la lista de matrículas del alumno.'],
      data: null,
    }
  }
}
