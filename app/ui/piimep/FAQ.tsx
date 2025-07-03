import React from "react";

export default function FAQ() {
  return (
    <div
      className={`mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-md shadow-gray-200/80`}
    >
      <h4 className="text-lg font-semibold text-[#0A4C8A]">
        Preguntas Frecuentes
      </h4>
      <p className="text-sm text-gray-500">
        Preguntas comunes sobre esta consulta
      </p>

      <div className="border-b border-gray-200 py-4">
        <h5 className="mb-1 font-semibold">
          ¿Qué es el Plan Comunal de Inversión de Infraestructura de Movilidad y
          Espacio Público (PIIMEP)?
        </h5>
        <p className="text-gray-600">
          Es un instrumento de planificación de mediano plazo que define, a
          nivel comunal, las obras de infraestructura de movilidad y espacio
          público. Está enmarcado en la Ley N°20.958 y debe actualizarse al
          menos cada 10 años.
        </p>
      </div>

      <div className="border-b border-gray-200 py-4">
        <h5 className="mb-1 font-semibold">¿Para qué sirve?</h5>
        <p className="text-gray-600">
          Sirve para mejorar la conectividad, accesibilidad, calidad de los
          espacios públicos, cohesión social y sustentabilidad urbana. Incluye
          obras como aceras, ciclovías, áreas verdes, iluminación, y mobiliario
          urbano.
        </p>
      </div>

      <div className="border-b border-gray-200 py-4">
        <h5 className="mb-1 font-semibold">
          ¿Qué tipología de proyectos identifica?
        </h5>
        <p className="text-gray-600">
          El PIIMEP contempla proyectos de movilidad motorizada y no motorizada,
          así como espacios públicos y áreas verdes en bienes nacionales de uso
          público (BNUP), existentes o proyectados.
        </p>
      </div>

      <div className="border-b border-gray-200 py-4">
        <h5 className="mb-1 font-semibold">
          ¿Qué herramientas incluye el PIIMEP?
        </h5>
        <p className="text-gray-600">
          Incluye Mitigación Directa (obras exigidas por impacto vial como
          ciclovías, paraderos, terminales, semáforos, señalización, entre
          otros) y Aportes al Espacio Público, que pueden ser cesiones de
          terreno o aportes monetarios destinados a obras del PIIMEP.
        </p>
      </div>

      <div className="border-b border-gray-200 py-4">
        <h5 className="mb-1 font-semibold">
          ¿Cuáles son los productos del PIIMEP?
        </h5>
        <p className="text-gray-600">
          Los principales productos son una cartera de proyectos, obras y
          medidas, y un plano que los localiza y codifica por tramos dentro de
          la comuna.
        </p>
      </div>

      <div className="pt-4">
        <h5 className="mb-1 font-semibold">
          ¿Cuál es la visión de El Quisco sobre la movilidad y el espacio
          público?
        </h5>
        <p className="text-gray-600">
          El Quisco busca ser un referente en movilidad sostenible, integrando
          transporte público, peatones, ciclistas y soluciones tecnológicas para
          crear una ciudad equitativa, saludable y cohesionada socialmente.
        </p>
      </div>
    </div>
  );
}

// Old questions
{
  /* <div
  className={`mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-md shadow-gray-200/80`}
>
  <h4 className="text-lg font-semibold text-[#0A4C8A]">Preguntas Frecuentes</h4>
  <p className="text-sm text-gray-500">Preguntas comunes sobre esta consulta</p>
  <div className="border-b border-gray-200 py-4">
    <h5 className="mb-1 font-semibold">
      ¿Cuánto tiempo tomará la construcción?
    </h5>
    <p className="text-gray-600">
      El proyecto está planificado para implementarse en fases durante
      aproximadamente 24 meses, comenzando en enero de 2026. Diferentes áreas
      serán afectadas en diferentes momentos para minimizar las interrupciones.
    </p>
  </div>
  <div className="border-b border-gray-200 py-4">
    <h5 className="mb-1 font-semibold">
      ¿Habrá cambios en la disponibilidad de estacionamiento?
    </h5>
    <p className="text-gray-600">
      Cada opción tiene diferentes impactos en el estacionamiento. La Opción A
      reduce el estacionamiento en superficie pero incluye una nueva estructura
      de estacionamiento. La Opción B mantiene la mayoría del estacionamiento
      existente. La Opción C incorpora estacionamiento dentro de nuevos
      desarrollos.
    </p>
  </div>
  <div className="border-b border-gray-200 py-4">
    <h5 className="mb-1 font-semibold">¿Cómo se financiará este proyecto?</h5>
    <p className="text-gray-600">
      El proyecto será financiado a través de una combinación de fondos de
      mejoras de capital de la ciudad, subvenciones estatales y federales, y
      potencialmente asociaciones público-privadas dependiendo de la opción
      final seleccionada.
    </p>
  </div>
  <div className="pt-4">
    <h5 className="mb-1 font-semibold">
      ¿Los negocios permanecerán abiertos durante la construcción?
    </h5>
    <p className="text-gray-600">
      Sí, estamos comprometidos a mantener el acceso a todos los negocios
      durante la construcción. Se implementará un programa de apoyo empresarial
      para ayudar con señalización, marketing y posible asistencia financiera.
    </p>
  </div>
</div>; */
}
