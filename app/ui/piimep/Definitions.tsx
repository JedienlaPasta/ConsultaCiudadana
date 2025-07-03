import React from "react";

export default function Definitions() {
  return (
    <div
      className={`mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-md shadow-gray-200/80`}
    >
      <h4 className="text-lg font-semibold text-[#0A4C8A]">
        Definición de Términos
      </h4>
      <p className="text-sm text-gray-500">
        A continuación se explican los principales términos utilizados en esta
        consulta ciudadana.
      </p>

      <div className="border-b border-gray-200 py-4">
        <h5 className="mb-1 font-semibold">Pavimentación</h5>
        <p className="text-gray-600">
          Obras que implican cubrir con asfalto u hormigón las calzadas (calles)
          y aceras (veredas) de una vía.
        </p>
      </div>

      <div className="border-b border-gray-200 py-4">
        <h5 className="mb-1 font-semibold">Acceso borde costero</h5>
        <p className="text-gray-600">
          Mejoramiento de pasajes peatonales y/o escaleras que conectan con el
          borde costero, facilitando su acceso.
        </p>
      </div>

      <div className="border-b border-gray-200 py-4">
        <h5 className="mb-1 font-semibold">Tramo conector</h5>
        <p className="text-gray-600">
          Calles que conectan Av. Dubournais con accesos al borde costero, e
          incluyen mejoras como veredas de mínimo 3 m, accesibilidad universal,
          arbolado, señalización, ciclo vías, iluminación, eliminación de
          estacionamientos, paisajismo absorbente y mobiliario urbano, todo bajo
          la normativa de la Ordenanza de Imagen Comunal (OIC).
        </p>
      </div>

      <div className="border-b border-gray-200 py-4">
        <h5 className="mb-1 font-semibold">Peatonalización</h5>
        <p className="text-gray-600">
          Transformación de calles en espacios para peatones, con mobiliario
          urbano, áreas verdes, señalización turística y accesibilidad. Puede
          ser:
          <br />
          <strong>Permanente:</strong> cierre definitivo al tránsito vehicular,
          fomentando comercio, turismo y convivencia.
          <br />
          <strong>Temporal:</strong> cierres parciales o por horarios,
          orientados a la seguridad infantil y ferias libres.
        </p>
      </div>

      <div className="border-b border-gray-200 py-4">
        <h5 className="mb-1 font-semibold">Gestión movilidad</h5>
        <p className="text-gray-600">
          Estrategias para mejorar la experiencia del peatón:
          <br />
          <strong>Cruce PIIMEP:</strong> cruces seguros y con identidad local.
          <br />
          <strong>Eliminación de estacionamientos:</strong> para mejorar
          seguridad y liberar espacio.
          <br />
          <strong>Sentido del tránsito:</strong> revisión del sentido de
          circulación para reducir el tráfico de paso en calles locales.
        </p>
      </div>

      <div className="border-b border-gray-200 py-4">
        <h5 className="mb-1 font-semibold">Ciclo vía táctica</h5>
        <p className="text-gray-600">
          Espacios delimitados para bicicletas en vías estructurantes. Buscan
          promover el transporte activo y pueden evolucionar a infraestructura
          permanente.
        </p>
      </div>

      <div className="border-b border-gray-200 py-4">
        <h5 className="mb-1 font-semibold">Sendero Quebrada</h5>
        <p className="text-gray-600">
          Senderos peatonales en quebradas naturales para fomentar la movilidad
          activa y proteger estos espacios. Incluyen pavimentos absorbentes,
          señalética turística y mobiliario de descanso.
        </p>
      </div>

      <div className="border-b border-gray-200 py-4">
        <h5 className="mb-1 font-semibold">Tramo conector ciclo vía</h5>
        <p className="text-gray-600">
          Mejoramiento de veredas a ambos lados de Av. Dubournais que incluyen
          ciclo vías. Se divide en:
          <br />
          <strong>Tramo norte:</strong> límite Algarrobo - Av. Pinomar.
          <br />
          <strong>Tramo centro:</strong> calle Laberintos - Rocas de Tabulanque.
          <br />
          <strong>Tramo sur:</strong> Puente Seminario - calle Las Higueras.
        </p>
      </div>

      <div className="border-b border-gray-200 py-4">
        <h5 className="mb-1 font-semibold">Plaza Nodo</h5>
        <p className="text-gray-600">
          Mejoramiento de plazas ubicadas en los tramos conectores. Deben
          incluir: normativa OIC, paisajismo absorbente, información turística,
          iluminación peatonal, arborización, juegos ecológicos para niños,
          piedra local y mobiliario de descanso.
        </p>
      </div>

      <div className="border-b border-gray-200 py-4">
        <h5 className="mb-1 font-semibold">Mejoramiento Pavimentación</h5>
        <p className="text-gray-600">
          Obras para reparar, restaurar o rehabilitar pavimentos existentes, con
          el fin de extender su vida útil y mejorar la circulación vehicular.
        </p>
      </div>

      <div className="pt-4">
        <h5 className="mb-1 font-semibold">Mejoramiento veredas</h5>
        <p className="text-gray-600">
          Proyectos de restauración o reparación de veredas para mejorar la
          experiencia peatonal, seguridad y accesibilidad.
        </p>
      </div>
    </div>
  );
}
