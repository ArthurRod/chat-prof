import { FirebaseError } from "firebase/app";

export function firebaseErrorConverter(error: FirebaseError) {
  let errorMessage;

  switch (error.code) {
    case "auth/user-not-found":
      errorMessage = "Usuário não encontrado.";
      break;
    case "auth/email-already-in-use":
      errorMessage = "O e-mail fornecido já está em uso por outro usuário.";
      break;
    case "auth/invalid-email":
      errorMessage = "O e-mail fornecido é inválido.";
      break;
    case "auth/invalid-password":
      errorMessage = "A senha precisa conter pelo menos seis caracteres.";
      break;
    case "auth/invalid-verification-code":
      errorMessage = "Código incorreto.";
      break;
    case "auth/wrong-password":
      errorMessage = "Senha incorreta.";
      break;
    case "auth/too-many-requests":
      errorMessage =
        "Muitas tentativas de login detectadas neste dispositivo, volte mais tarde para tentar novamente.";
      break;
    default:
      errorMessage = "Ocorreu um erro ao se autenticar.";
  }

  return errorMessage;
}
