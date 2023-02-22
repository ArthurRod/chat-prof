import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

export function handleSignOut(pathName?: string) {
  signOut(auth)
    .then(() => {
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("pass");

      if (pathName) {
        window.location.href = `/${pathName}`;
      } else {
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.log("Ocorreu um erro ao sair: " + error);
    });
}
