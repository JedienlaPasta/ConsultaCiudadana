import Image from "next/image";
import Link from "next/link";
import MapSection from "@/app/ui/piimep/MapSection";

export default function SurveyDetail() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-[#0A4C8A] text-white">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="flex items-center gap-2 text-sm mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al Inicio
          </Link>
          
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">Activa</span>
            <span className="bg-[#1E5A9A] text-white text-xs px-3 py-1 rounded-full">Infraestructura</span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Plan PIIMEP - Mejoramiento de Espacios Públicos</h1>
          <div className="flex items-center text-sm">
            <span>Fecha límite: Mayo 30, 2023</span>
            <span className="mx-2">•</span>
            <span>76 participantes</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - About & Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-[#23396f] mb-4">Acerca de esta Consulta</h2>
              <p className="text-gray-600 mb-4">
                Conoce más sobre esta iniciativa y cómo tu participación puede marcar una diferencia en los espacios públicos de El Quisco.
              </p>
              
              <h3 className="text-lg font-semibold text-[#23396f] mt-6 mb-3">Descripción General</h3>
              <p className="text-gray-600 mb-4">
                El Plan PIIMEP tiene como objetivo rediseñar los espacios públicos de nuestra comuna para mejorar la calidad de vida de los residentes. 
                Con el crecimiento de la población en nuevas áreas y los cambios en los patrones de uso, es momento de evaluar y actualizar nuestros espacios 
                para asegurar que satisfagan las necesidades actuales mientras nos preparamos para el crecimiento futuro.
              </p>
              
              {/* Map Section */}
              <div className="mt-8 mb-6">
                <div className="relative w-full h-[300px] bg-gray-100 rounded-lg overflow-hidden">
                  <MapSection />
                </div>
                <p className="text-sm text-gray-500 mt-2">Mapa actual con los cambios propuestos destacados</p>
              </div>
              
              <h3 className="text-lg font-semibold text-[#23396f] mt-8 mb-3">Objetivos</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Mejorar la frecuencia de servicios en áreas de alta demanda</li>
                <li>Extender la cobertura a barrios desatendidos</li>
                <li>Reducir los tiempos de traslado para destinos comunes</li>
                <li>Mejor integración con sistemas de transporte regionales</li>
                <li>Implementar más infraestructura sostenible y accesible</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-[#23396f] mt-8 mb-3">Cronograma</h3>
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#0A4C8A] text-white font-bold text-sm">1</div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-[#0A4C8A]">Participación Ciudadana</h4>
                    <p className="text-sm text-gray-600">Recolección de opiniones sobre espacios actuales y necesidades</p>
                    <p className="text-xs text-gray-500 mt-1">Abril - Mayo 2023</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#0A4C8A] text-white font-bold text-sm">2</div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-[#0A4C8A]">Análisis de Propuestas</h4>
                    <p className="text-sm text-gray-600">Análisis de datos y desarrollo de nuevas opciones de diseño</p>
                    <p className="text-xs text-gray-500 mt-1">Junio - Julio 2023</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#0A4C8A] text-white font-bold text-sm">3</div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-[#0A4C8A]">Selección Final</h4>
                    <p className="text-sm text-gray-600">Finalización de cambios basados en la retroalimentación</p>
                    <p className="text-xs text-gray-500 mt-1">Agosto 2023</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#0A4C8A] text-white font-bold text-sm">4</div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-[#0A4C8A]">Implementación</h4>
                    <p className="text-sm text-gray-600">Despliegue de nuevas rutas y horarios</p>
                    <p className="text-xs text-gray-500 mt-1">Octubre 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Participation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-[#23396f] mb-4">Participación</h2>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Participantes actuales</span>
                  <span className="text-sm text-gray-600">Meta: 200</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-[#0A4C8A] h-2.5 rounded-full" style={{ width: '38%' }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">76 participantes</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Estado</span>
                  <span className="text-sm font-medium text-green-600">Activa</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Departamento</span>
                  <span className="text-sm font-medium">Infraestructura</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Fecha de inicio</span>
                  <span className="text-sm font-medium">Abril 15, 2023</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Fecha límite</span>
                  <span className="text-sm font-medium">Mayo 30, 2023</span>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-[#0A4C8A] mb-3">Cómo Participar</h3>
                <ol className="space-y-2 text-sm text-gray-600">
                  <li className="flex">
                    <span className="mr-2">1.</span>
                    <span>Revisa la información detallada sobre el proyecto</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">2.</span>
                    <span>Explora las opciones disponibles en el mapa</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">3.</span>
                    <span>Inicia sesión en tu cuenta (requerido para votar)</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">4.</span>
                    <span>Envía tu voto antes de la fecha límite</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">5.</span>
                    <span>Únete a la discusión para compartir tus ideas</span>
                  </li>
                </ol>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0A4C8A] mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <h3 className="font-semibold text-[#0A4C8A]">Autenticación Requerida</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Necesitas iniciar sesión para participar en esta consulta.</p>
                <button className="w-full flex items-center justify-center gap-2 bg-[#0A4C8A] text-white py-2 px-4 rounded-lg hover:bg-[#0A3C6A] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Iniciar Sesión
                </button>
              </div>
              
              <div>
                <h3 className="font-semibold text-[#23396f] mb-3">Consultas Relacionadas</h3>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <h4 className="font-medium text-[#0A4C8A]">Revitalización del Centro</h4>
                    <p className="text-xs text-gray-500">Planificación Urbana • Activa</p>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <h4 className="font-medium text-[#0A4C8A]">Rediseño del Parque Comunitario</h4>
                    <p className="text-xs text-gray-500">Parques y Recreación • Activa</p>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <h4 className="font-medium text-[#0A4C8A]">Proyecto de Expansión de Ciclovías</h4>
                    <p className="text-xs text-gray-500">Transporte • Próximamente</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Link href="/consultas" className="text-sm text-[#0A4C8A] hover:underline">
                    Ver Todas las Consultas
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Blob */}
      <div className="relative h-[30vh] w-full overflow-hidden">
        <Image
          src="/Blob19.svg"
          width={1920}
          height={1080}
          alt="Footer Background"
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
      </div>
    </div>
  );
}
