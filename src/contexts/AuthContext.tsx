import { createContext, FormEvent, useEffect, useState } from "react";
import { ReactNode } from "react";
import { auth } from "../services/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  UserCredential,
} from "firebase/auth";

import { User } from "../types/User";

type AuthContextType = {
  user: User | undefined;
  loadingUser: boolean;
  logInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  logInWithPhoneNumber: (otp: string) => Promise<void>;
  sendOTP: (
    e: FormEvent,
    phoneNumber: string,
    setExpandForm: (expandForm: boolean) => void
  ) => void;
};

type AuthContextProvider = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider(props: AuthContextProvider) {
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

  const logInWithPhoneNumber = async (otp: string) => {
    const confirmationResult = window.confirmationResult;

    if (confirmationResult) {
      confirmationResult
        .confirm(otp)
        .then((result: UserCredential) => {
          setLoadingUser(true);
          const { user } = result;

          if (user) {
            const { uid, displayName, phoneNumber } = user;

            if (uid) {
              setUser({
                uid: uid,
                name: displayName!,
                phone: phoneNumber!,
              });
            }
          }
        })
        .catch((error: any) => {
          console.log(error);
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

    if (phoneNumber.length >= 14) {
      if (user) {
        setUser(undefined);
      }

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
        user,
        loadingUser,
        logInWithEmailAndPassword,
        logInWithPhoneNumber,
        sendOTP,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
