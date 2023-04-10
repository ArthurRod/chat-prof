export function assignData(
  event: any,
  alterarDado: (parametro: string) => void
) {
  if (event.target.value !== 0) {
    event.target.style.backgroundColor = "#fff";
    alterarDado(event.target.value);
  }
}
