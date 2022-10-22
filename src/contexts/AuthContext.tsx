import { createContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "../types/User";
import { ReactNode } from "react";

type AuthContextType = {
  user: User | undefined;
  logInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
};

type AuthContextProvider = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider(props: AuthContextProvider) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    persistUser();
  }, []);

  const persistUser = async () => {
    let uid = sessionStorage.getItem("uid");
    let email = sessionStorage.getItem("email");

    if (uid && uid.length > 0 && email && email.length > 0) {

      setUser({
        uid: uid,
        email: email,
      });

    } else {

      onAuthStateChanged(auth, (user) => {
        
        if (user) {
          const { uid, email } = user;

          if (!uid || !email) {
            throw new Error("Missing user information.");
          }

          setUser({
            uid: uid,
            email: email,
          });
        }
      });
      
    }
  };

  const logInWithEmailAndPassword = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);

    if (result.user) {
      const { uid, email } = result.user;

      if(uid && email) {

        sessionStorage.setItem('uid', uid);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('pass', password);
        
      }

      if (!uid || !email) {
        throw new Error("Missing information from Account.");
      }

      setUser({
        uid: uid,
        email: email,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, logInWithEmailAndPassword }}>
      {props.children}
    </AuthContext.Provider>
  );
}
