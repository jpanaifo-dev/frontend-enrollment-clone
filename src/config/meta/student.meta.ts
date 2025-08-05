export const APPLICATION_METADATA = {
  PAGES: {
    HOME: {
      title: 'Inicio | SIGAE - Matrícula',
      description:
        'Bienvenido al sistema de matrícula de la Escuela de Postgrado.',
    },
    ENROLLMENT: {
      title: 'Matrícula',
      description: 'Gestiona tu proceso de matrícula fácilmente.',
    },
    START_ENROLLMENT: {
      title: 'Comenzar Matrícula',
      description: 'Inicia el proceso de matrícula para tus cursos.',
    },
    SELECT_COURSES: {
      title: 'Seleccionar Cursos',
      description: 'Elige los cursos que deseas matricular.',
    },
    VERIFY_ENROLLMENT: {
      title: 'Verificar Matrícula',
      description: 'Revisa y verifica los detalles de tu matrícula.',
    },
    CONFIRMATION: {
      title: 'Confirmación de Matrícula',
      description: 'Tu matrícula ha sido confirmada exitosamente.',
    },
    ENROLLMENT_HISTORY: {
      title: 'Historial de Matrícula',
      description: 'Consulta el historial de tus matrículas anteriores.',
    },
    ENROLLMENT_DETAIL: {
      title: (enrollmentId: string) => `Detalle de Matrícula #${enrollmentId}`,
      description: (details: string) => `Detalles de la matrícula: ${details}.`,
    },
    PAYMENTS: {
      title: 'Pagos',
      description: 'Gestiona tus pagos de matrícula y cuotas académicas.',
    },
    PERSONAL_INFO: {
      title: 'Información Personal',
      description: 'Actualiza y gestiona tu información personal.',
    },
    CONTACT_INFO: {
      title: 'Información de Contacto',
      description: 'Actualiza tus datos de contacto para mantenerte informado.',
    },
  },
}
