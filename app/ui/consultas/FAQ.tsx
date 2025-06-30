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
          ¿Cuánto tiempo tomará la construcción?
        </h5>
        <p className="text-gray-600">
          El proyecto está planificado para implementarse en fases durante
          aproximadamente 24 meses, comenzando en enero de 2026. Diferentes
          áreas serán afectadas en diferentes momentos para minimizar las
          interrupciones.
        </p>
      </div>
      <div className="border-b border-gray-200 py-4">
        <h5 className="mb-1 font-semibold">
          ¿Habrá cambios en la disponibilidad de estacionamiento?
        </h5>
        <p className="text-gray-600">
          Cada opción tiene diferentes impactos en el estacionamiento. La Opción
          A reduce el estacionamiento en superficie pero incluye una nueva
          estructura de estacionamiento. La Opción B mantiene la mayoría del
          estacionamiento existente. La Opción C incorpora estacionamiento
          dentro de nuevos desarrollos.
        </p>
      </div>
      <div className="border-b border-gray-200 py-4">
        <h5 className="mb-1 font-semibold">
          ¿Cómo se financiará este proyecto?
        </h5>
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
          durante la construcción. Se implementará un programa de apoyo
          empresarial para ayudar con señalización, marketing y posible
          asistencia financiera.
        </p>
      </div>
    </div>
  );
}
