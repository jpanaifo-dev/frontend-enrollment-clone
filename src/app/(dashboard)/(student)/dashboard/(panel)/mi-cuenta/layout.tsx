import { BannerSection } from '@/components/app'
import { APP_URL } from '@/config/urls-data/student.urls.config'
import { LayoutProfileWrapper } from '@/modules/app'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BannerSection
        title="Configuración de Cuenta"
        description={`Administra y personaliza tu cuenta. Actualiza tu información personal, cambia tu contraseña, gestiona preferencias y configura opciones de seguridad para mejorar tu experiencia. 🚀`}
      />
      <div id="change-email-form" />
      <LayoutProfileWrapper
        removeWrapper
        items={[
          {
            title: 'Cambiar correo electrónico',
            url: `${APP_URL.ACCOUNT.URL_BASE}`,
          },
          {
            title: 'Cambiar Contraseña',
            url: `${APP_URL.ACCOUNT.CHANGE_PASSWORD}`,
          },
        ]}
      >
        {children}
      </LayoutProfileWrapper>
    </>
  )
}
