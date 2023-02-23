export function isEmptyInputs(targets?: NodeListOf<HTMLInputElement>) {
  let inputs = targets
    ? targets
    : (document.querySelectorAll("form input") as NodeListOf<HTMLInputElement>);
  let erro = document.querySelector("form .erro") as HTMLElement;
  let isEmptyInputs = false;

  inputs.forEach((element) => {
    if (element.value.length === 0) {
      element.style.backgroundColor = "rgba(255, 0, 0, 0.4)";

      erro.style.display = "flex";

      isEmptyInputs = true;

      setTimeout(() => {
        erro.style.display = "none";
      }, 5000);
    } else {
      element.style.backgroundColor = "#fff";
    }
  });

  return isEmptyInputs;
}

export function assignData(
  event: any,
  alterarDado: (parametro: string) => void
) {
  if (event.target.value !== 0) {
    event.target.style.backgroundColor = "#fff";
    alterarDado(event.target.value);
  }
}

export function clearInputs(targets?: NodeListOf<HTMLInputElement>) {
  let inputs = targets
    ? targets
    : (document.querySelectorAll("input") as NodeListOf<HTMLInputElement>);

  if (inputs) {
    inputs.forEach((item) => (item.value = ""));
  }
}
