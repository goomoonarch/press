export const formatDays = (input) => {
  const months = Math.floor(input);
  const fractionalPart = input - months;
  const days = Math.round(fractionalPart * 30);

  const monthString = months === 1 ? "1 mes" : `${months} meses`;
  const dayString = days === 1 ? "1 día" : `${days} días`;

  return days > 0 ? `${monthString} y ${dayString}` : monthString;
};
