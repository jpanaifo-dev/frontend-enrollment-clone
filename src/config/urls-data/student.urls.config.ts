const URL_BASE = '/dashboard'

export const APP_URL = {
  HOME: {
    URL_BASE: `${URL_BASE}`,
    REGISTER: `/sign-up`,
    PROGRAMS: {
      URL_BASE: `/programas`,
      PROGRAM_DETAIL: (uuid: string) => `/programas/${uuid}`,
    },
    CONVOCATION: {
      URL_BASE: `/convocatorias`,
      DETAILS: (uuid: string) => `/convocatorias/${uuid}`,
      PROGRAMS_BY_CONVOCATION: (uuid: string) => `/convocatorias/${uuid}`,
      PROGRAM_DETAIL: (uuid: string, id: string) =>
        `/convocatorias/${uuid}/${id}`,
    },
    ADMISION: {
      URL_BASE: `/admision-postgrado`,
    },
    ABOUT_US: {
      URL_BASE: `/acerca-de-nosotros`,
    },
    TERMS_AND_CONDITIONS: `/terminos-y-condiciones`,
    PRIVACY_POLICY: `/politica-privacidad`,
    LANDING: `/`,
  },
  AUTH: {
    LOGIN: `/login`,
    REGISTER: `/sign-up`,
  },
  MATRICULA: {
    LIST: `${URL_BASE}/matriculas`,
    MATRICULAS_LIST: {
      URL_BASE: `${URL_BASE}/matriculas`,
      DETAIL: (uuid: string) => `${URL_BASE}/matriculas/${uuid}`,
    },
    EXTRAORDINARY: {
      URL_BASE: `${URL_BASE}/matricula/extraordinaria`,
      DETAIL: (uuid: string) => `/matricula/extraordinaria/${uuid}`,
    },
    START_ENROLLMENT: {
      URL_BASE: `${URL_BASE}/matricular`,
      STEP_TWO: (uuid_payment: string) =>
        `${URL_BASE}/matricular/${uuid_payment}`,
    },
  },
  PROFILE: {
    URL_BASE: `${URL_BASE}/perfil`,
    CHANGE_PASSWORD: `${URL_BASE}/perfil/cambiar-contrasena`,
  },
}

export const LANDINGS_URLS_APP = {}
