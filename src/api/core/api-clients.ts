import { SERVICES_MODULES, ServicesModulesType } from '@/config/modules.cofig'
import { buildHeaders } from './build-headers'

class ApiClient {
  private module: keyof ServicesModulesType
  private baseUrl: string

  constructor(module: keyof ServicesModulesType) {
    this.module = module
    const { URL_PROD, URL_LOCAL } = SERVICES_MODULES[module]
    const isProduction = process.env.NODE_ENV === 'production'
    this.baseUrl = (isProduction ? URL_PROD : URL_LOCAL) || ''

    if (!this.baseUrl) {
      throw new Error(`Base URL no configurada para el módulo: ${module}`)
    }
  }

  private async request(
    path: string,
    options: RequestInit = {},
    customHeaders?: Record<string, string>
  ): Promise<Response> {
    const defaultHeaders = await buildHeaders(this.module)
    const headers = {
      ...defaultHeaders,
      ...(options.headers || {}),
      ...(customHeaders || {}),
    }
    const url = `${this.baseUrl}${path}`
    return fetch(url, { ...options, headers })
  }

  get(
    path: string,
    customHeaders?: Record<string, string>
    // noStore?: boolean
  ): Promise<Response> {
    return this.request(path, { method: 'GET' }, customHeaders)
  }

  getWithNoStore(
    path: string,
    customHeaders?: Record<string, string>
  ): Promise<Response> {
    return this.request(
      path,
      { method: 'GET', cache: 'no-store' },
      customHeaders
    )
  }

  post(
    path: string,
    body: unknown,
    isFormData = false,
    customHeaders?: Record<string, string>
  ): Promise<Response> {
    return this.request(
      path,
      {
        method: 'POST',
        body: isFormData ? (body as FormData) : JSON.stringify(body),
        headers: isFormData
          ? undefined
          : { 'Content-Type': 'application/json' },
      },
      customHeaders
    )
  }

  put(
    path: string,
    body: unknown,
    isFormData = false,
    customHeaders?: Record<string, string>
  ): Promise<Response> {
    return this.request(
      path,
      {
        method: 'PUT',
        body: isFormData ? (body as FormData) : JSON.stringify(body),
        headers: isFormData
          ? undefined
          : { 'Content-Type': 'application/json' },
      },
      customHeaders
    )
  }

  patch(
    path: string,
    body: unknown,
    isFormData = false,
    customHeaders?: Record<string, string>
  ): Promise<Response> {
    return this.request(
      path,
      {
        method: 'PATCH',
        body: isFormData ? (body as FormData) : JSON.stringify(body),
        headers: isFormData
          ? undefined
          : { 'Content-Type': 'application/json' },
      },
      customHeaders
    )
  }

  delete(
    path: string,
    customHeaders?: Record<string, string>
  ): Promise<Response> {
    return this.request(path, { method: 'DELETE' }, customHeaders)
  }
}

export default ApiClient
