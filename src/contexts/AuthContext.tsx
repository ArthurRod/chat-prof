import { createContext, FormEvent, useEffect, useState } from "react";
import { ReactNode } from "react";
import { auth } from "../services/firebase";
import {
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  UserCredential,
} from "firebase/auth";

import { User } from "../types/User";
import { isStringMaxSize } from "../helpers/isStringMaxSize";
import { FirebaseError } from "firebase/app";
import { firebaseErrorConverter } from "../helpers/firebaseErrorConverter";

type AuthContextType = {
  error: string | undefined;
  user: User | undefined;
  loadingUser: boolean;
  logInWithPhoneNumber: (otp: string) => Promise<void>;
  sendOTP: (
    e: FormEvent,
    phoneNumber: string,
    setExpandForm: (expandForm: boolean) => void
  ) => void;
};

type AuthContextProvider = {
  children: JSX.Element;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthContextProvider) {
  const [user, setUser] = useState<User | undefined>();
  const [loadingUser, setLoadingUser] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    persistUser();
  }, []);

  const persistUser = () => {
    setLoadingUser(true);

    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid, phoneNumber, displayName } = user;

          if (uid && phoneNumber) {
            setUser({
              uid: uid,
              phone: phoneNumber,
              name: displayName ? displayName : "",
            });

            setLoadingUser(false);
          }
        } else {
          setLoadingUser(false);
        }
      });
    } catch (error) {
      setLoadingUser(false);
      console.log(error);
    }
  };

  const logInWithPhoneNumber = async (otp: string) => {
    const confirmationResult = window.confirmationResult;

    if (confirmationResult) {
      setLoadingUser(true);

      confirmationResult
        .confirm(otp)
        .then((result: UserCredential) => {
          const { user } = result;

          if (user) {
            const { uid, displayName, phoneNumber } = user;

            if (uid && phoneNumber) {
              setUser({
                uid: uid,
                phone: phoneNumber,
                name: displayName ? displayName : "",
              });
            }
          }
        })
        .catch((error: any) => {
          if (error instanceof FirebaseError) {
            const convertedError = firebaseErrorConverter(error);

            setError(convertedError);
          }
        })
        .finally(() => setLoadingUser(false));
    }
  };

  const sendOTP = (
    event: FormEvent,
    phoneNumber: string,
    setExpandForm: (expandForm: boolean) => void
  ) => {
    event.preventDefault();

    if (isStringMaxSize(phoneNumber, 13)) {
      generateRecaptchaVerifier();
      setExpandForm(true);

      const appVerifier = window.recaptchaVerifier;

      if (appVerifier) {
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      alert("Preencha os campos corretamente");
    }
  };

  const generateRecaptchaVerifier = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
      auth
    );
  };

  return (
    <AuthContext.Provider
      value={{
        error,
        user,
        loadingUser,
        logInWithPhoneNumber,
        sendOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
