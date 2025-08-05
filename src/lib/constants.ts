export const buttonLabels = {
  labelSubmit: {
    next: 'Siguiente',
    finish: 'Terminar y guardar',
    save: 'Guardar',
    add: 'Agregar'
  },
  labelCancel: {
    back: 'Atrás',
    cancel: 'Cancelar'
  }
}

export const ActionsTypes = {
  FORGOT_PASSWORD: 'forgot-password',
  SIGN_UP: 'sign-up',
  VERIFY_EMAIL: 'verify-email'
}

export type IActionsTypes =
  | 'forgot-password'
  | 'sign-up'
  | 'verify-email'
  | 'payment-validate'

export const statusLabels = [
  { label: 'Activo', value: 'activo' },
  { label: 'Inactivo', value: 'inactivo' }
]

export const URL_BROCHURE = `https://sigae-epg-bucket.s3.us-east-2.amazonaws.com/storage/files/Manual_para_postulantes_v1.2.pdf`
