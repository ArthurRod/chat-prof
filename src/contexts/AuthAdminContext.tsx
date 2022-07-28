import { FormEvent, createContext, useState } from "react";
import { signInWithEmailAndPassword, auth, db } from "../services/firebase";
import { AdminUser } from "../types/AdminUser";
import { AuthContextProvider } from "../types/AuthContextProvider";
import { AuthAdminContextType } from "../types/AuthAdminContextType";

export const AuthAdminContext = createContext({} as AuthAdminContextType);

export function AuthAdminProvider(props: AuthContextProvider) {
  const [user, setUser] = useState<AdminUser>();

  const logInWithEmailAndPassword = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        console.log(user);
        //navigate("/home")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
      });
  };

  return (
    <AuthAdminContext.Provider value={{ user, logInWithEmailAndPassword }}>
      {props.children}
    </AuthAdminContext.Provider>
  );
}
