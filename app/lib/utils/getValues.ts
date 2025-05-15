export const getDaysLeft = (date: Date | null) => {
  if (!date) return 0;

  const today = new Date();
  const diff = date.getTime() - today.getTime();
  if (diff < 0) return 0;

  const daysLeft = Math.ceil(diff / (1000 * 3600 * 24));
  return daysLeft;
};
