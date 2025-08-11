import { Button } from '@/components/ui/button'
import { APP_URL } from '@/config/urls-data/student.urls.config'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Award,
  GraduationCap,
  Info,
  Trophy,
  Users,
} from 'lucide-react'

import SectionWrapper from '@/components/app/SectionWrapper'
import ProcessCard from '@/components/app/ProcessCard'
import PaymentCard from '@/components/app/PaymentCard'
import RecommendationCard from '@/components/app/RecommendationCard'
import DocumentCard from '@/components/app/DocumentCard'
import PaymentMethod from '@/components/app/PaymentMethod'
import {
  DOCUMENT_URLS,
  PROCESS_DATES,
  PAYMENT_INFO,
  RECOMMENDATIONS,
} from './home.constants'
import { Badge } from '@/components/ui/badge'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Students studying at Instituto Mycrosystem"
          className="object-cover w-full h-full"
          width={1920}
          height={1080}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/70 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <Badge className="mb-6 bg-red-800 text-white px-4 py-2 text-sm font-semibold">
            MATRÍCULA 2025-I DISPONIBLE
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            <span className="text-yellow-400">Instituto</span>
            <br />
            <span className="text-white">Mycrosystem</span>
          </h1>

          <div className="mb-8 flex gap-4">
            <div className="w-1 h-32 bg-yellow-400"></div>
            <div>
              <h2 className="text-white text-2xl font-bold mb-4">
                Forjamos el futuro tecnológico
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed mb-6">
                Únete a la institución líder en formación tecnológica.
                Desarrollamos profesionales competentes con visión innovadora,
                preparados para los desafíos del mundo digital.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-yellow-400">
                  <Award className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    Certificación Internacional
                  </span>
                </div>
                <div className="flex items-center gap-2 text-yellow-400">
                  <Users className="w-5 h-5" />
                  <span className="text-sm font-medium">+5,000 Graduados</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-400">
                  <Trophy className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    95% Inserción Laboral
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-6 text-lg font-bold rounded-lg transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link
                href={APP_URL.AUTH.LOGIN}
                className="flex items-center gap-2"
              >
                <div>
                  <GraduationCap className="w-8 h-8" />
                </div>
                Iniciar Matrícula 2025
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>

            {/* <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300"
              asChild
            >
              <Link href="#programas">Conocer Programas</Link>
            </Button> */}
          </div>
        </div>
      </div>

      {/* Process Steps Section */}
      <SectionWrapper
        title="Etapas del proceso"
        description="Infórmate sobre tu cronograma de matrícula y realiza tu inscripción a tiempo para evitar contratiempos o recargos."
      >
        <div className="grid md:grid-cols-3 gap-8">
          <ProcessCard
            title="Pago por derecho de matrícula"
            description="Es el primer paso del proceso. Realiza el pago correspondiente para habilitar tu matrícula en el sistema."
            date={PROCESS_DATES.PAYMENT}
            borderColor="border border-gray-200"
            textColor="text-blue-900"
          />
          <ProcessCard
            title="Matrícula regular"
            description="Completa tu matrícula en las fechas regulares para evitar recargos adicionales y asegurar la disponibilidad de materias."
            date={PROCESS_DATES.REGULAR}
            borderColor="border border-blue-200"
            textColor="text-blue-600"
          />
          <ProcessCard
            title="Matrícula extemporánea"
            description="Se habilita excepcionalmente tras el vencimiento del período regular y está sujeta a recargos económicos."
            date={PROCESS_DATES.LATE}
            borderColor="border border-red-200"
            textColor="text-red-600"
          />
        </div>
      </SectionWrapper>

      {/* Payment Information Section */}
      <SectionWrapper
        title="Información de pagos"
        description="Revisa los conceptos, montos y plazos de pago necesarios para completar tu matrícula."
        bgColor="bg-gray-50"
      >
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Medios disponibles para el pago
            </h3>
            <div className="flex justify-center mb-6">
              <PaymentMethod
                image="/images/bg-bn.webp"
                alt="Banco de la Nación"
                width={160}
                height={80}
                className="mr-12"
              />
              <PaymentMethod
                image="/images/bg-pagalo.webp"
                alt="Págalo.pe"
                width={120}
                height={50}
              />
            </div>
            <div className="flex space-x-1.5 text-gray-500">
              <Info
                size={34}
                width={44}
                height={18}
              />
              <p className="text-xs max-w-xs leading-relaxed">
                Una vez realizado el pago, deberás esperar 24 horas para que se
                active. No intentes matricularte inmediatamente después de
                pagar.
              </p>
            </div>
          </div>

          <PaymentCard
            title="Pago por matrícula regular"
            amount={PAYMENT_INFO.REGULAR.amount}
            code={PAYMENT_INFO.REGULAR.code}
            dates={PAYMENT_INFO.REGULAR.dates}
            gradient="bg-gradient-to-br from-[#006FEE] to-[#003F88]"
            iconColor="bg-blue-500"
          />

          <PaymentCard
            title="Pago por matrícula extemporánea"
            amount={PAYMENT_INFO.LATE.amount}
            code={PAYMENT_INFO.LATE.code}
            dates={PAYMENT_INFO.LATE.dates}
            gradient="bg-gradient-to-br from-[#D32F2F] to-[#6D1818]"
            iconColor="bg-red-500"
          />
        </div>
      </SectionWrapper>

      {/* Recommendations Section */}
      <SectionWrapper
        title="Te recomendamos"
        description="Antes de iniciar tu proceso de matrícula, te sugerimos tener en cuenta esta información que te ayudará a tener una experiencia exitosa."
        bgColor="bg-gray-50"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {RECOMMENDATIONS.map((item, index) => (
            <RecommendationCard
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* Important Documents Section */}
      <SectionWrapper
        title="Documentos importantes"
        description="Descarga los documentos oficiales que necesitarás durante tu proceso de matrícula y tu vida académica."
        center
      >
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <DocumentCard
            title="Reglamento académico"
            description="Infórmate sobre los procedimientos y criterios que guían la formación en la institución."
            url={DOCUMENT_URLS.REGULATIONS}
            disabled
          />
          <DocumentCard
            title="Manual de matrícula"
            description="Manual paso a paso para completar tu matrícula en el sistema."
            url={DOCUMENT_URLS.MANUAL}
          />
        </div>
      </SectionWrapper>
    </div>
  )
}
