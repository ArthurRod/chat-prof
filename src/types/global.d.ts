export {};

declare global {
  interface Window {
    recaptchaVerifier: any; // 👈️ turn off type checking
    confirmationResult: any;
  }
}
