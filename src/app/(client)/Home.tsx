import { Button } from '@/components/ui/button';
import { STUDENT_URLS_APP } from '@/config/urls-data/student.urls.config';
import Image from 'next/image';
import Link from 'next/link';
import { Info } from 'lucide-react';

import SectionWrapper from '@/components/app/SectionWrapper';
import ProcessCard from '@/components/app/ProcessCard';
import PaymentCard from '@/components/app/PaymentCard';
import RecommendationCard from '@/components/app/RecommendationCard';
import DocumentCard from '@/components/app/DocumentCard';
import PaymentMethod from '@/components/app/PaymentMethod';
import { DOCUMENT_URLS, PROCESS_DATES, PAYMENT_INFO, RECOMMENDATIONS } from './home.constants';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <main className="relative min-h-[calc(100vh-80px)] flex flex-row items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/background-landing.webp"
            alt="University campus with students"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/70"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-7xl font-extrabold text-yellow-400 mb-8 leading-tight">
              MATRÍCULA
              <br />
              2025 - I
            </h1>

            <div className="mb-5 flex gap-4">
              <div className="w-1 h-28 bg-yellow-400 mb-4"></div>
              <div>
                <p className="text-white text-lg font-semibold mb-1">
                  ¡Bienvenido(a) ingresante!
                </p>
                <p className="text-white text-lg leading-relaxed">
                  Gracias por formar parte de nuestra comunidad académica.
                  <br />
                  Estamos muy contentos de recibirte y de acompañarte en este
                  nuevo camino de aprendizaje, retos y logros.
                </p>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-md"
              asChild
            >
              <Link href={STUDENT_URLS_APP.AUTH.LOGIN}>Empezar matrícula</Link>
            </Button>
          </div>
        </div>
      </main>

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
              <Info size={34} width={44} height={18} />
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
  );
}
