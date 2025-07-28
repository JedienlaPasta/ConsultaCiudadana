export const formatDate = (date: Date | string) => {
  if (!date) return "";
  if (typeof date === "string") {
    date = new Date(date);
  }

  const esDate = date.toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const splitDate = esDate.toString().split(" ");
  const dia = splitDate[0];
  const mes = splitDate[2][0].toUpperCase() + splitDate[2].slice(1);
  const año = splitDate[4];

  return dia + " " + mes + ", " + año;
};

export const formatDateToSpanish = (date: Date | string) => {
  if (!date) return "";

  let dateObj: Date;

  if (typeof date === "string") {
    const [year, month, day] = date.split("-").map(Number);
    dateObj = new Date(year, month - 1, day); // month - 1 porque los meses van de 0-11
  } else {
    dateObj = date;
  }

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const day = dateObj.getDate().toString().padStart(2, "0"); // Agregar 0 al principio
  const month = monthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${day} ${month}, ${year}`;
};

export const formatTime = (date: Date | null) => {
  if (!date) return "";
  const esTime = date.toLocaleString("es-ES", {
    hour: "numeric",
    minute: "numeric",
  });
  const splitTime = esTime.toString().split(" ");
  const hora = splitTime[0];

  return hora;
};
