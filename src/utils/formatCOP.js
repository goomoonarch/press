export const formatCOP = (value) => {
  if (!value) return "$ 0"; 
  const numberValue = parseInt(value, 10);
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numberValue);
};
