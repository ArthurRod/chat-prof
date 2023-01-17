import { createContext, FormEvent, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  UserCredential,
} from "firebase/auth";
import { User } from "../types/User";
import { ReactNode } from "react";

type AuthContextType = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  logInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  sendOTP: (
    e: FormEvent,
    phoneNumber: string,
    setExpandForm: (expandForm: boolean) => void
  ) => void;
  verifyOTP: (otp: string) => Promise<void>;
};

type AuthContextProvider = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider(props: AuthContextProvider) {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    persistUser();
  }, []);

  const persistUser = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, phoneNumber } = user;

        if (uid) {
          setUser({
            uid: uid,
            name: displayName!,
            phone: phoneNumber!,
          });
        } else {
          throw new Error("Missing user information.");
        }
      }
    });
  };

  const logInWithEmailAndPassword = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);

    if (result.user) {
      const { uid, email } = result.user;

      if (uid) {
        sessionStorage.setItem("email", email!);
        sessionStorage.setItem("pass", password);

        setUser({
          uid: uid,
        });
      } else {
        throw new Error("Missing information from Account.");
      }
    }
  };

  const verifyOTP = async (otp: string) => {
    const confirmationResult = window.confirmationResult;

    confirmationResult
      .confirm(otp)
      .then((result: UserCredential) => {
        if (result.user) {
          const { uid, displayName, phoneNumber } = result.user;

          if (uid) {
            setUser({
              uid: uid,
              name: displayName!,
              phone: phoneNumber!,
            });
          } else {
            throw new Error("Missing information from Account.");
          }
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const sendOTP = (
    event: FormEvent,
    phoneNumber: string,
    setExpandForm: (expandForm: boolean) => void
  ) => {
    event.preventDefault();

    if (phoneNumber.length >= 14) {
      generateRecaptchaVerifier();
      setExpandForm(true);

      if (user) setUser(undefined);

      const appVerifier = window.recaptchaVerifier;

      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const generateRecaptchaVerifier = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, logInWithEmailAndPassword, sendOTP, verifyOTP }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
