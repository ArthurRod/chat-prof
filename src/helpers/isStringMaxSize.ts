export function isStringMaxSize(inputMaskValue: string, maxSize: number) {
  const inputNoMaskValue = inputMaskValue.replace(/[^a-zA-Z0-9]/g, "");

  if (inputNoMaskValue.length === maxSize) {
    return true;
  }

  return false;
}
