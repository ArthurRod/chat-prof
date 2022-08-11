import { createContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "../types/User";
import { ReactNode } from "react";

type AuthContextType = {
  user: User | undefined; //se não tiver usuário logado será undefined
  logInWithEmailAndPassword: (email: string, password: string) => void;
}

type AuthContextProvider = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider(props: AuthContextProvider) {
  const [user, setUser] = useState<User>();

  useEffect(() => {   //Hook para manter o login(estado) ao atualizar a página

    persistUser();

  }, [])

  const persistUser = async () => {

    onAuthStateChanged(auth, (user) => {

      if (user) {
        const { uid, email } = user

        if (!uid || !email) {
          throw new Error('Missing user information.');
        }

        setUser({
          uid: uid,
          email: email
        })
      }
    })
  }

  const logInWithEmailAndPassword = async (email: string, password: string) => {

    const result = await signInWithEmailAndPassword(auth, email, password)

    if (result.user) {
      const { uid, email } = result.user

      if (!uid || !email) {
        throw new Error('Missing user information.');
      }

      setUser({
        uid: uid,
        email: email
      })

    } else {
      alert("O usuário não cadastrado")
    }
  };

  return (
    <AuthContext.Provider value={{ user, logInWithEmailAndPassword }}>
      {props.children}
    </AuthContext.Provider>
  );
}
