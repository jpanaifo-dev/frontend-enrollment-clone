export const DOCUMENT_URLS = {
  REGULATIONS: 'https://example.com/download/regulations.pdf',
  MANUAL:
    'https://sigae-epg-bucket.s3.us-east-2.amazonaws.com/storage/files/f502620c77254341918cc707faf6df4c.pdf',
};

export const PROCESS_DATES = {
  PAYMENT: '26 MAY - 07 JUN, 2025',
  REGULAR: '27 MAY - 02 JUN, 2025',
  LATE: '04 JUN - 09 JUN, 2025',
};

export const PAYMENT_INFO = {
  REGULAR: {
    amount: 'S/ 201.00',
    code: '782',
    dates: '26 MAY - 30 MAY,2025',
  },
  LATE: {
    amount: 'S/ 251.00',
    code: '782',
    dates: '03 JUN - 07 JUN,2025',
  },
};

export const RECOMMENDATIONS = [
  {
    title: 'Conocer tu cronograma',
    description:
      'Familiarízate con todas las fechas importantes y no te pierdas ninguna etapa del proceso de matrícula.',
    icon: 'calendar',
  },
  {
    title: 'Conocer tu malla curricular',
    description:
      'Explora el plan de estudios de tu programa, las materias que cursarás y los prerrequisitos necesarios.',
    icon: 'document',
  },
  {
    title: 'Ten tus pagos al día',
    description:
      'Estar al día en los pagos es parte de una buena organización durante el ciclo académico.',
    icon: 'credit-card',
  },
];
