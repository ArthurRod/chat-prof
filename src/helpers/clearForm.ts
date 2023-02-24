export function clearForm(referenceId: string) {
  const target = document.getElementById(`#${referenceId}`) as HTMLFormElement;

  const form = target;

  if (form) {
    form.reset();
  }
}
