export function formatDate(date: Date | string | number) {
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleDateString("pt-BR", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
