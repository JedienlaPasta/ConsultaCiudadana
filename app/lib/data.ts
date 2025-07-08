export const QUESTIONS_LIST = [
  {
    index: 0,
    step: "Seleccionar sector",
    step_description: "Tu lugar de residencia",
    question: "¿En que sector se ubica tu vivienda?",
    answers: 1,
    description: "Haz clic en el mapa para seleccionar el sector donde vives.",
    options: [
      {
        id: "EL QUISCO NORTE",
        name: "El Quisco Norte",
        population: "~2300 hab.",
        area: "1.2 km²",
      },
      {
        id: "EL QUISCO ALTO",
        name: "El Quisco Alto",
        population: "~1500 hab.",
        area: "0.8 km²",
      },
      {
        id: "PINOMAR",
        name: "Pinomar",
        population: "~1600 hab.",
        area: "0.6 km²",
      },
      {
        id: "EL QUISCO CENTRO ORIENTE",
        name: "Quisco Centro Oriente",
        population: "~1500 hab.",
        area: "1.5 km²",
      },
      {
        id: "EL QUISCO CENTRO PONIENTE",
        name: "Quisco Centro Poniente",
        population: "~2100 hab.",
        area: "1.3 km²",
      },
      {
        id: "EL QUISCO SUR ORIENTE",
        name: "Quisco Sur Oriente",
        population: "~1100 hab.",
        area: "1.0 km²",
      },
      {
        id: "EL QUISCO SUR PONIENTE",
        name: "Quisco Sur Poniente",
        population: "~2300 hab.",
        area: "0.9 km²",
      },
      {
        id: "EL TOTORAL BAJO",
        name: "El Totoral Bajo",
        population: "~400 hab.",
        area: "0.4 km²",
      },
      {
        id: "PUNTA DE TRALCA",
        name: "Punta de Tralca",
        population: "~2500 hab.",
        area: "0.7 km²",
      },
      {
        id: "ISLA NEGRA",
        name: "Isla Negra",
        population: "~1300 hab.",
        area: "1.1 km²",
      },
      {
        id: "EL TOTORAL MEDIO",
        name: "El Totoral Medio",
        population: "~500 hab.",
        area: "0.5 km²",
      },
      {
        id: "EL TOTORAL NORTE",
        name: "El Totoral Norte",
        population: "~200 hab.",
        area: "0.6 km²",
      },
      {
        id: "EL TOTORAL",
        name: "El Totoral",
        population: "~1000 hab.",
        area: "0.5 km²",
      },
    ],
  },
  {
    index: 1,
    step: "Componentes urbanos",
    step_description: "Mejoras a implementar en tu sector",
    question: "Seleccione tres componentes",
    answers: 3,
    description: "",
    options: [
      {
        id: "1",
        name: "Tramo conector",
        question: "Seleccione un tramo conector",
        description: "Descripcion de la opción numero uno...",
        answers: 1,
        options: [
          {
            id: "1.1",
            name: "Tramo conector Peñablanca",
            description: "Descripcion del tramo numero uno...",
            sector: "EL QUISCO NORTE",
          },
          {
            id: "1.2",
            name: "Tramo conector Ruca pedrera",
            description: "Descripcion del tramo numero dos...",
            sector: "EL QUISCO NORTE",
          },
          {
            id: "1.3",
            name: "Tramo conector Miramar",
            description: "Descripcion del tramo numero tres...",
            sector: "EL QUISCO SUR PONIENTE",
          },
          {
            id: "1.4",
            name: "Tramo conector Narciso aguirre",
            description: "Descripcion del tramo numero cuatro...",
            sector: "EL QUISCO CENTRO PONIENTE",
          },
          {
            id: "1.5",
            name: "Tramo conector Lobos tranquilos",
            description: "Descripcion del tramo numero cinco...",
            sector: "EL QUISCO CENTRO PONIENTE",
          },
          {
            id: "1.6",
            name: "Tramo conector Cisne negro",
            description: "Descripcion del tramo numero seis...",
            sector: "EL QUISCO CENTRO PONIENTE",
          },
          {
            id: "1.7",
            name: "Tramo conector Av Punta tralca",
            description: "Descripcion del tramo numero siete...",
            sector: "PUNTA DE TRALCA",
          },
          {
            id: "1.8",
            name: "Tramo conector Piedra del trueno",
            description: "Descripcion del tramo numero ocho...",
            sector: "PUNTA DE TRALCA",
          },
          {
            id: "1.9",
            name: "Tramo conector Isla negra",
            description: "Descripcion del tramo numero nueve...",
            sector: "ISLA NEGRA",
          },
        ],
      },
      {
        id: "2",
        name: "Peatonalizacion permanente",
        description: "Descripcion de la opción numero dos...",
      },
      {
        id: "3",
        name: "Peatonalizacion temporal",
        description: "Descripcion de la opción numero tres...",
      },
      {
        id: "4",
        name: "Sentido de tránsito",
        description: "Descripcion de la opción numero cuatro...",
      },
      {
        id: "5",
        name: "Cruce piimep dubornais",
        description: "Descripcion de la opción numero cinco...",
      },
      {
        id: "6",
        name: "Ciclovia táctica",
        description: "Descripcion de la opción numero seis...",
      },
      {
        id: "7",
        name: "Eliminación estacionamiento",
        description: "Descripcion de la opción numero siete...",
      },
      {
        id: "8",
        name: "Sendero quebrada",
        description: "Descripcion de la opción numero ocho...",
      },
      {
        id: "9",
        name: "Acceso borde costero",
        description: "Descripcion de la opción numero nueve...",
      },
    ],
  },
  {
    index: 2,
    step: "Confirmar voto",
    step_description: "Confirma que los datos son correctos",
    question: "Resumen",
    answers: 1,
    description: "",
    options: [],
  },
];

export const surveysList = [
  {
    id: 1,
    title: "Plan PIIMEP",
    description:
      "Consulta para la mejora de espacios públicos de la comuna de El Quisco",
    endDate: "2025-07-30",
  },
  {
    id: 2,
    title: "Plan PIIMEP",
    description:
      "Consulta para la mejora de espacios públicos de la comuna de El Quisco",
    endDate: "2025-07-14",
  },
  {
    id: 3,
    title: "Plan PIIMEP",
    description:
      "Consulta para la mejora de espacios públicos de la comuna de El Quisco",
    endDate: "2025-06-15",
  },
];
