export const formatDate = (date: Date | null) => {
  if (!date) return "";
  const esDate = date.toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const splitDate = esDate.toString().split(" ");
  const dia = splitDate[0];
  const mes = splitDate[2][0].toUpperCase() + splitDate[2].slice(1, 3);
  const año = splitDate[4];

  return dia + " " + mes + ", " + año;
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
