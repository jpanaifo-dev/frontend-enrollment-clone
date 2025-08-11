import { Button } from '@/components/ui/button'
import { APP_URL } from '@/config/urls-data/student.urls.config'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Award,
  CheckCircle,
  Globe,
  GraduationCap,
  Lightbulb,
  Trophy,
  Users,
} from 'lucide-react'

import SectionWrapper from '@/components/app/SectionWrapper'
import RecommendationCard from '@/components/app/RecommendationCard'
import { RECOMMENDATIONS } from './home.constants'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <main className="relative min-h-screen flex items-center overflow-hidden">
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
                    <span className="text-sm font-medium">
                      +5,000 Graduados
                    </span>
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
        {/* Floating Stats */}
        <div className="absolute bottom-8 left-8 right-8 z-10 hidden md:block">
          <div className="container mx-auto">
            <div className="grid grid-cols-4 gap-4 max-w-2xl">
              {[
                { number: '25+', label: 'Años de Experiencia' },
                { number: '50+', label: 'Docentes Especializados' },
                { number: '15', label: 'Programas Académicos' },
                { number: '98%', label: 'Satisfacción Estudiantil' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20"
                >
                  <div className="text-2xl font-bold text-yellow-400">
                    {stat.number}
                  </div>
                  <div className="text-xs text-white font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-2">
              ¿Por qué elegir Mycrosystem?
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Excelencia académica que transforma vidas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Somos más que una institución educativa. Somos tu aliado
              estratégico para alcanzar el éxito profesional en el mundo
              tecnológico.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: 'Metodología Innovadora',
                description:
                  'Aprendizaje basado en proyectos reales con tecnología de vanguardia y enfoque práctico.',
                color: 'bg-blue-500',
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Docentes Expertos',
                description:
                  'Profesionales activos en la industria que comparten experiencia real y conocimiento actualizado.',
                color: 'bg-green-500',
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Certificación Internacional',
                description:
                  'Títulos y certificaciones reconocidas mundialmente que abren puertas en cualquier país.',
                color: 'bg-purple-500',
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group shadow-none transition-all duration-300 hover:-translate-y-2 rounded-sm border"
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-6">
              Tu futuro tecnológico
              <span className="text-yellow-400"> empieza aquí</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              No esperes más para dar el paso que transformará tu carrera
              profesional. Únete a la comunidad Mycrosystem y conviértete en el
              profesional que el mundo necesita.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center gap-2 text-yellow-400">
                <CheckCircle className="w-5 h-5" />
                <span>Matrícula sin costo adicional</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-400">
                <CheckCircle className="w-5 h-5" />
                <span>Becas disponibles</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-400">
                <CheckCircle className="w-5 h-5" />
                <span>Certificación garantizada</span>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-12 py-6 text-xl font-bold rounded-lg transition-all duration-300 hover:scale-105 mb-4"
              asChild
            >
              <Link
                href="/auth/login"
                className="flex items-center gap-3"
              >
                <GraduationCap className="w-7 h-7" />
                Matricúlate Ahora - 2025
                <ArrowRight className="w-6 h-6" />
              </Link>
            </Button>

            <p className="text-sm text-gray-400">
              * Plazas limitadas. Proceso de matrícula disponible hasta febrero
              2025
            </p>
          </div>
        </div>
      </section>

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
    </div>
  )
}
