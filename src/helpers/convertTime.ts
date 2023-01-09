export function convertTime(dateSeconds: number) {
  const date = new Date(dateSeconds * 1000);
  const dateFormatBr = date.toLocaleDateString("pt-BR");

  return dateFormatBr;
}
