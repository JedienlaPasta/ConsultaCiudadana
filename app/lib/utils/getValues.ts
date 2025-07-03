export const getDaysLeft = (date: Date | null) => {
  if (!date) return 0;

  const today = new Date();
  const diff = date.getTime() - today.getTime();
  if (diff < 0) return 0;

  const daysLeft = Math.ceil(diff / (1000 * 3600 * 24));
  return daysLeft;
};

export const getDV = (rut?: string | number) => {
  if (!rut) {
    return null;
  }
  rut = rut.toString();
  let sum = 0;
  let multiplier = 2;
  for (let i = rut.length - 1; i >= 0; i--) {
    const digit = parseInt(rut.charAt(i), 10);
    sum += digit * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  const dv = 11 - (sum % 11);
  if (dv === 11) {
    return "0";
  } else if (dv === 10) {
    return "K";
  } else {
    return dv.toString();
  }
};
