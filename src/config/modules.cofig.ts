export const SERVICES_MODULES = {
  STUDENT: {
    URL_PROD: process.env.APP_API_USER_SERVICE,
    URL_LOCAL: process.env.APP_API_USER_SERVICE_LOCAL,
    TOKEN: process.env.APP_TOKEN_STUDENT,
  },
  TEACHER: {
    URL_PROD: process.env.APP_API_USER_SERVICE,
    URL_LOCAL: process.env.APP_API_USER_SERVICE_LOCAL,
    TOKEN: process.env.APP_TOKEN_ADMIN,
  },
  PERSON: {
    URL_PROD: process.env.APP_API_PERSON_SERVICE,
    URL_LOCAL: process.env.APP_API_PERSON_SERVICE_LOCAL,
    TOKEN: process.env.APP_TOKEN_PERSON,
  },
  CORE: {
    URL_PROD: process.env.APP_API_CORE_SERVICE,
    URL_LOCAL: process.env.APP_API_CORE_SERVICE_LOCAL,
    TOKEN: undefined,
  },
  ADMISION: {
    URL_PROD: process.env.APP_API_ADMISSION_SERVICE,
    URL_LOCAL: process.env.APP_API_ADMISSION_SERVICE_LOCAL,
    TOKEN: undefined,
  },
  PROGRAM: {
    URL_PROD: process.env.APP_API_PROGRAM_SERVICE,
    URL_LOCAL: process.env.APP_API_PROGRAM_SERVICE_LOCAL,
    TOKEN: undefined,
  },
  FILE: {
    URL_PROD: process.env.APP_API_FILE_SERVICE,
    URL_LOCAL: process.env.APP_API_FILE_SERVICE_LOCAL,
    TOKEN: undefined,
  },
  REPORT: {
    URL_PROD: process.env.APP_API_REPORT_SERVICE,
    URL_LOCAL: process.env.APP_API_REPORT_SERVICE_LOCAL,
    TOKEN: undefined,
  },
  EVALUATION: {
    URL_PROD: process.env.APP_API_EVALUATION_SERVICE,
    URL_LOCAL: process.env.APP_API_EVALUATION_SERVICE_LOCAL,
    TOKEN: undefined,
  },
  ACADEMIC: {
    URL_PROD: process.env.APP_API_ACADEMIC_SERVICE,
    URL_LOCAL: process.env.APP_API_ACADEMIC_SERVICE_LOCAL,
    TOKEN: undefined,
  },
  ECONOMIC: {
    URL_PROD: process.env.APP_API_ECONOMIC_SERVICE,
    URL_LOCAL: process.env.APP_API_ECONOMIC_SERVICE_LOCAL,
    TOKEN: undefined,
  },
}

export type ServicesModulesType = typeof SERVICES_MODULES
