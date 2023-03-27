import { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

import { User } from "../types/User";

type AuthAdminContextType = {
  user: User | undefined;
  loadingUser: boolean;
  logInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  reloginUser: () => Promise<void>;
};

type AuthAdminContextProvider = {
  children: JSX.Element;
};

export const AuthAdminContext = createContext({} as AuthAdminContextType);

export function AuthAdminProvider({ children }: AuthAdminContextProvider) {
  const [user, setUser] = useState<User | undefined>();
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    persistUser();
  }, []);

  const persistUser = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoadingUser(true);

        try {
          const { uid, displayName, phoneNumber } = user;

          if (uid) {
            setUser({
              uid: uid,
              name: displayName!,
              phone: phoneNumber!,
            });
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoadingUser(false);
        }
      }
    });
  };

  const logInWithEmailAndPassword = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);

    if (result) {
      setLoadingUser(true);
      const { user } = result;

      try {
        const { uid } = user;

        if (uid) {
          sessionStorage.setItem("email", email!);
          sessionStorage.setItem("pass", password);

          setUser({
            uid: uid,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingUser(false);
      }
    }
  };

  const reloginUser = async () => {
    const email = sessionStorage.getItem("email");
    const pass = sessionStorage.getItem("pass");

    if (email && pass && pass.length > 5) {
      await logInWithEmailAndPassword(email, pass);
    }
  };

  return (
    <AuthAdminContext.Provider
      value={{
        user,
        loadingUser,
        logInWithEmailAndPassword,
        reloginUser,
      }}
    >
      {children}
    </AuthAdminContext.Provider>
  );
}
