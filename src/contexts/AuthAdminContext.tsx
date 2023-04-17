import { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

import { User } from "../types/User";
import { FirebaseError } from "firebase/app";
import { firebaseErrorConverter } from "../helpers/firebaseErrorConverter";

type AuthAdminContextType = {
  error: string | undefined;
  adminUserAuth: User | undefined;
  loadingUser: boolean;
  logInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void | string>;
  reloginUser: () => Promise<void>;
};

type AuthAdminContextProvider = {
  children: JSX.Element;
};

export const AuthAdminContext = createContext({} as AuthAdminContextType);

export function AuthAdminProvider({ children }: AuthAdminContextProvider) {
  const [adminUserAuth, setAdminUserAuth] = useState<User | undefined>();
  const [loadingUser, setLoadingUser] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    persistUser();
  }, []);

  const persistUser = () => {
    setLoadingUser(true);

    try {
      onAuthStateChanged(auth, (adminUserAuth) => {
        if (adminUserAuth) {
          const { uid } = adminUserAuth;

          if (uid) {
            setAdminUserAuth({
              uid: uid,
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUser(false);
    }
  };

  const logInWithEmailAndPassword = async (email: string, password: string) => {
    setLoadingUser(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      if (result) {
        const { user } = result;
        const { uid } = user;

        if (uid) {
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("pass", password);

          setAdminUserAuth({
            uid: uid,
          });
        }
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        const convertedError = firebaseErrorConverter(error);

        setError(convertedError);

        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } finally {
      setLoadingUser(false);
    }
  };

  const reloginUser = async () => {
    const email = sessionStorage.getItem("email");
    const pass = sessionStorage.getItem("pass");

    if (email && pass && pass.length > 5) {
      setLoadingUser(true);
      await logInWithEmailAndPassword(email, pass);
      setLoadingUser(false);
    }
  };

  return (
    <AuthAdminContext.Provider
      value={{
        error,
        adminUserAuth,
        loadingUser,
        logInWithEmailAndPassword,
        reloginUser,
      }}
    >
      {children}
    </AuthAdminContext.Provider>
  );
}
