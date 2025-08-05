export function getUserServiceUrl(): string {
  const isProduction = process.env.NODE_ENV === 'production'
  const urlProd = process.env.APP_API_REPORT_SERVICE
  const urlDev = process.env.APP_API_REPORT_SERVICE_LOCAL

  if (isProduction && !urlProd) {
    throw new Error('APP_API_USER_SERVICE no está definido en producción.')
  }

  if (!isProduction && !urlDev) {
    throw new Error(
      'APP_API_USER_SERVICE_LOCAL no está definido en desarrollo.'
    )
  }

  return isProduction ? urlProd! : urlDev!
}
