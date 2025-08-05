// constants/formLabels.ts
export const PROFILE_FORM_LABELS = {
  CONTACT_FORM: {
    TITLE: 'Información de contacto',
    DESCRIPTION:
      'Completa tus datos de contacto para continuar con el proceso de admisión.',
    MESSAGE: '(*) Campos obligatorios',
    FIELDS: {
      ubigeoCode: {
        label: 'Código de Ubigeo *',
        placeholder: 'Ejemplo: Loreto - Maynas - Iquitos',
        description: 'Seleccione su código de Ubigeo según su ubicación.',
      },
      address: {
        label: 'Dirección *',
        placeholder: 'Ingrese su dirección completa',
      },
      email: {
        label: 'Email adicional *',
        placeholder: 'ejemplo@dominio.com',
        description:
          'Este correo será utilizado para enviar información importante.',
      },
      linkedin: {
        label: 'LinkedIn ',
        placeholder: 'Ingrese su perfil de LinkedIn',
        description: 'Ingrese su perfil de LinkedIn. (Opcional)',
      },
      cellphone: {
        label: 'Celular *',
        placeholder: 'Ingrese su número de celular',
      },
      whatsapp: {
        label: 'WhatsApp *',
        placeholder: 'Ingrese su número de WhatsApp',
      },
    },
  },
  PROFILE_FORM: {
    GENERAL_INFORMATION: {
      TITLE: 'Datos Personales',
      DESCRIPTION:
        'Completa tus datos personales para registrar tu información de manera adecuada.',
      MESSAGE: '(*) Campos obligatorios',
      FIELDS: {
        profilePhoto: {
          label: 'Foto *',
          placeholder: 'Sube tu foto de perfil',
          description: 'Haz clic en "Editar" para cambiar tu foto de perfil.',
        },
        identityDocument: {
          label: 'Documento de identidad *',
          placeholder: 'Selecciona tu tipo de documento',
          description: 'Este campo no puede ser modificado.',
        },
        documentNumber: {
          label: 'Número de documento',
          placeholder: 'Número de documento',
          description: 'Este campo no puede ser modificado.',
        },
        firstName: {
          label: 'Nombres *',
          placeholder: 'Ingresa tus nombres',
          description: 'Por favor, completa este campo.',
        },
        lastName: {
          label: 'Primer apellido *',
          placeholder: 'Ingresa tu primer apellido',
          description: 'Por favor, completa este campo.',
        },
        secondLastName: {
          label: 'Segundo apellido *',
          placeholder: 'Ingresa tu segundo apellido',
          description: 'Por favor, completa este campo.',
        },
        indigenousCommunity: {
          label: 'Pertenezco a una comunidad indígena',
          placeholder: '',
          description: 'Selecciona esta opción si aplicable.',
        },
        gender: {
          label: 'Género *',
          placeholder: 'Selecciona tu género',
          description: 'Selecciona tu género.',
        },
        maritalStatus: {
          label: 'Estado civil *',
          placeholder: 'Selecciona tu estado civil',
          description: 'Selecciona tu estado civil.',
        },
      },
    },
    ORIGIN_AND_BIRTH: {
      TITLE: 'Lugar de Origen y Fecha de Nacimiento',
      DESCRIPTION:
        'Registra la información relacionada con tu lugar de nacimiento y tu fecha de nacimiento.',
      FIELDS: {
        country: {
          label: 'País de nacimiento *',
          description: 'Seleccione su país de residencia.',
          placeholder: 'Seleccione su país de residencia',
        },
        birthplace: {
          label: 'Lugar nacimiento *',
          placeholder: 'Seleccione su lugar de nacimiento',
        },
        birthdate: {
          label: 'Fecha de nacimiento *',
          placeholder: 'Seleccione su fecha de nacimiento',
        },
      },
    },
    DEMOGRAPHIC_INFORMATION: {
      TITLE: 'Información Demográfica',
      DESCRIPTION:
        'Seleccione su lengua materna, indique si pertenece a una comunidad indígena o si tiene alguna discapacidad.',
      FIELDS: {
        nativeLanguage: {
          label: 'Lengua materna',
          placeholder: 'Seleccione su lengua materna o escríbalo',
          description:
            'Seleccione su lengua materna o escríbalo si no se encuentra en la lista.',
        },
        comunityIndigenous: {
          label: 'Pertenezco a una comunidad indígena',
          placeholder: 'Seleccione si pertenece a una comunidad indígena',
          description:
            'Seleccione esta opción si pertenece a una comunidad indígena.',
        },
        disability: {
          label: 'Tengo una discapacidad',
          placeholder: 'Seleccione si tiene alguna discapacidad',
          description: 'Seleccione si tiene alguna discapacidad.',
        },
      },
    },
  },
  EDUCATION_FORM: {
    TITLE: 'Educación',
    DESCRIPTION:
      'Muestra tus aptitudes y tendrás el doble de probabilidades de ser aceptado.',
    MESSAGE: '(*) Campos obligatorios',
    FIELDS: {
      educationLevel: {
        label: 'Selecciona el nivel educativo *',
        placeholder: 'Selecciona un nivel educativo',
        description: 'Selecciona tu nivel educativo.',
      },
      careerName: {
        label: 'Nombre de la carrera o programa *',
        placeholder: 'Selecciona una carrera',
        description: 'Ingresa el nombre de la carrera.',
      },
      denomination: {
        label: 'Denominación profesional *',
        placeholder: 'Selecciona una denominación profesional',
        description: 'Ingresa la denominación de tu carrera.',
      },
      faculty: {
        label: 'Facultad *',
        placeholder: 'Selecciona una facultad',
        description: 'Selecciona la facultad a la que pertenece la carrera.',
      },
      institutionName: {
        label: 'Institución *',
        labelInput: 'Nombre de la institución *',
        placeholder: 'Selecciona una institución',
        description:
          'Si la institución de estudio es la Universidad Nacional de la Amazonía Peruana, mantén la opción seleccionada. De lo contrario, deselecciónala y escribe el nombre de la institución.',
      },
      institutionUNAP: {
        label: 'UNIVERSIDAD NACIONAL DE LA AMAZONÍA PERUANA',
        subLabel: ' (UNAP)',
        description: 'Estudiante o egresado de esta universidad.',
      },
      startDate: {
        label: 'Inicio de estudios *',
        placeholder: 'mm/dd/yyyy',
        description: 'Selecciona la fecha de inicio de tus estudios.',
      },
      endDate: {
        label: 'Fin de estudios *',
        placeholder: 'mm/dd/yyyy',
        description: 'Selecciona la fecha de finalización de tus estudios.',
      },
      diplomaDate: {
        label: 'Fecha de entrega de diploma *',
        placeholder: 'mm/dd/yyyy',
        description: 'Selecciona la fecha en que recibiste tu diploma.',
      },
      uploadFile: {
        label: 'Subir archivo (PDF) (Opcional)',
        placeholder:
          'Arrastra y suelta un archivo aquí o haz clic para seleccionar',
        description:
          'Este archivo reemplazará el archivo anterior. Solo se aceptan archivos PDF.',
      },
    },
  },
  JOB_FORM: {
    TITLE: 'Experiencia Laboral',
    DESCRIPTION:
      'Muestra tus logros y consigue más oportunidades de aceptación.',
    MESSAGE: '(*) Campos obligatorios',
    FIELDS: {
      workSector: {
        label: 'Sector laboral *',
        placeholder: 'Sector laboral',
        description: 'Selecciona el sector laboral en el que trabajaste.',
      },
      country: {
        label: 'País *',
        placeholder: 'País',
        description: 'Selecciona el país en el que trabajaste.',
      },
      modality: {
        label: 'Modalidad de trabajo *',
        placeholder: 'Modalidad de trabajo',
        description: 'Selecciona la modalidad de trabajo que desempeñaste.',
      },
      companyName: {
        label: 'Nombre de la empresa o institución *',
        placeholder: 'Ej. UNAN-Managua',
        description:
          'Ingresa el nombre de la empresa o institución en la que has trabajado.',
      },
      workArea: {
        label: 'Área de trabajo *',
        placeholder: 'Ej. Administración, Logística, Marketing',
        description: 'Ingresa el área de trabajo que desempeñaste.',
      },
      jobTitle: {
        label: 'Puesto de trabajo *',
        placeholder: 'Ej. Gerente de ventas, Practicante',
        description: 'Ingresa el puesto de trabajo que desempeñaste.',
      },
      startDate: {
        label: 'Fecha de inicio *',
        placeholder: 'mm/dd/yyyy',
        description: 'Selecciona la fecha de inicio de tu trabajo.',
      },
      endDate: {
        label: 'Fecha fin *',
        placeholder: 'mm/dd/yyyy',
        description:
          'Si aún trabajas en la empresa, puedes dejar este campo vacío.',
      },
    },
  },
  LANGUAGE_FORM: {
    TITLE: 'Idiomas',
    DESCRIPTION:
      'Completa tus datos académicos para continuar con el proceso de admisión.',
    MESSAGE: '(*) Campos obligatorios',
    FIELDS: {
      language: {
        label: 'Idioma *',
        placeholder: 'Ej. Inglés',
        description: 'Ingresa el lengua que dominas.',
      },
      proficiency: {
        label: 'Nivel de dominio *',
        placeholder: 'Ej. Intermedio',
        description: 'Selecciona tu nivel de dominio del lengua.',
      },
      certificate: {
        label: 'Certificado (Opcional)',
        placeholder: 'Sube tu certificado en PDF',
        description:
          'Este archivo reemplazará el archivo anterior. Solo se aceptan archivos PDF.',
      },
      institution: {
        label: 'Institución *',
        placeholder: 'Ej. British Council',
        description: 'Ingresa la institución que te certificó.',
      },
    },
  },
}

export const LABELS_BUTTONS_FORM = {
  SAVE: 'Actualizar datos',
  CANCEL: 'Cancelar',
}

export const languageLevels = [
  { id: 1, name: 'Básico' },
  { id: 2, name: 'Intermedio' },
  { id: 3, name: 'Avanzado' },
]