'use client'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import Image from 'next/image'
import Link from 'next/link'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'

const URL_BASE =
  process.env.APP_API_REPORT_SERVICE || 'https://postgradounap.edu.pe'

interface ToolCardProps {
  title: string
  description: string
  buttonText: string
  imgLink?: string
  linkTo?: string
  onClickAction?: () => void
  target?: '_blank' | '_self'
  rel?: string
}

const ToolCard = ({
  title,
  description,
  buttonText,
  imgLink,
  linkTo,
  onClickAction,
  rel = 'noopener noreferrer',
  target = '_blank',
}: ToolCardProps) => (
  <section className="border border-gray-200 p-4 rounded-lg flex flex-col gap-3 min-w-80">
    <header className="flex gap-4 items-center">
      <Image
        src={imgLink || '/images/default-image.png'}
        alt={title}
        width={48}
        height={48}
      />
      <h3 className="text-lg font-bold">{title}</h3>
    </header>
    <div>
      <p className="text-gray-500 pb-2 text-sm">{description}</p>
      {onClickAction ? (
        <Button
          size="sm"
          variant="outline"
          className="border-gray-200 text-gray-700"
          onClick={onClickAction}
        >
          {buttonText}
        </Button>
      ) : (
        <Button
          size="sm"
          variant="outline"
          className="border-gray-200 text-gray-700"
          disabled={!linkTo}
        >
          <Link
            href={linkTo || '#'}
            target={target}
            rel={rel}
          >
            {buttonText}
          </Link>
        </Button>
      )}
    </div>
  </section>
)

const API_BASE = ENDPOINTS_CONFIG.REPORT

export const DownloadSection = ({
  person_token,
}: {
  person_token?: string
}) => {
  const url_cv = `${URL_BASE}/${API_BASE.GET_CV_PERSON}?person=${person_token}`
  return (
    <section className="bg-white rounded-lg p-4 sm:p-8 mb-8 border border-gray-200 flex flex-col gap-2 overflow-hidden">
      <div>
        <h3 className="text-lg font-bold">Herramientas</h3>
      </div>
      <ScrollArea className="w-96 sm:w-full rounded-md">
        <div className="flex sm:grid gap-4 w-full">
          <ToolCard
            title="Recuerda mantener tu información actualizada"
            description="Mantén tu información actualizada y completa para que puedas postularte a los programas de tu interés. Recuerda que también puedes obtener el resumen de tu perfil en formato PDF."
            buttonText="Descargar PDF"
            imgLink={'/svg/paper.svg'}
            linkTo={url_cv}
          />
          {/* <ToolCard
            title="Administra tus archivos"
            description="Administra tus archivos y documentos de manera sencilla. Puedes subir, descargar y eliminar archivos de tu perfil."
            buttonText="Ir a mis archivos"
            imgLink={'/svg/history.svg'}
            linkTo={ADMISSION_URLS_APP?.FILES?.URL_BASE}
          /> */}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  )
}
