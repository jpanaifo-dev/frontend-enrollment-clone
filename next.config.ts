import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'enlinea.unapiquitos.edu.pe',
      },
      {
        protocol: 'https',
        hostname: 'diariolaregion.com',
      },
      {
        protocol: 'https',
        hostname: 'http://192.168.16.182:8000/',
      },
    ],
  },
  env: {
    APP_NAME: process.env.APP_NAME,
    // local APIs
    APP_API_USER_SERVICE_LOCAL: process.env.APP_API_USER_SERVICE_LOCAL,
    APP_API_PERSON_SERVICE_LOCAL: process.env.APP_API_PERSON_SERVICE_LOCAL,
    APP_API_CORE_SERVICE_LOCAL: process.env.APP_API_CORE_SERVICE_LOCAL,
    APP_API_ADMISSION_SERVICE_LOCAL:
      process.env.APP_API_ADMISSION_SERVICE_LOCAL,
    APP_API_REPORT_SERVICE_LOCAL: process.env.APP_API_REPORT_SERVICE_LOCAL,
    APP_API_ACADEMIC_SERVICE_LOCAL: process.env.APP_API_ACADEMIC_SERVICE_LOCAL,
    //deployed APIs
    APP_API_USER_SERVICE: process.env.APP_API_USER_SERVICE,
    APP_API_PERSON_SERVICE: process.env.APP_API_PERSON_SERVICE,
    APP_API_CORE_SERVICE: process.env.APP_API_CORE_SERVICE,
    APP_API_ADMISSION_SERVICE: process.env.APP_API_ADMISSION_SERVICE,
    APP_API_REPORT_SERVICE: process.env.APP_API_REPORT_SERVICE,
    APP_API_ACADEMIC_SERVICE: process.env.APP_API_ACADEMIC_SERVICE,
    // keys to access the APIs
    SESSION_SECRET: process.env.SESSION_SECRET,
    APP_TOKEN_STUDENT: process.env.APP_TOKEN_STUDENT,
    APP_TOKEN_ADMIN: process.env.APP_TOKEN_ADMIN,
    API_RENIEC: process.env.API_URL_RENIEC,
    API_KEY_RENIEC: process.env.API_KEY_RENIEC,
    // keys to access the auth0
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
}

export default nextConfig
