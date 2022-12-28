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
  logInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  sendOTP: (
    e: FormEvent,
    phoneNumber: string,
    setExpandForm: (expandForm: boolean) => void
  ) => void;
  verifyOTP: (e: any, setOTP: (OTP: string) => void) => Promise<void>;
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
    const uid = sessionStorage.getItem("uid");

    if (uid && uid.length > 0) {
      setUser({
        uid: uid,
      });
    } else {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid } = user;

          if (!uid) {
            throw new Error("Missing user information.");
          }

          setUser({
            uid: uid,
          });
        }
      });
    }
  };

  const logInWithEmailAndPassword = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);

    if (result.user) {
      const { uid, email } = result.user;

      if (uid && email) {
        sessionStorage.setItem("uid", uid);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("pass", password);
      }

      if (!uid || !email) {
        throw new Error("Missing information from Account.");
      }

      setUser({
        uid: uid,
      });
    }
  };

  const verifyOTP = async (e: any, setOTP: (OTP: string) => void) => {
    const otp = e.target.value;
    setOTP(otp);

    if (otp.length === 6) {
      const confirmationResult = window.confirmationResult;

      confirmationResult
        .confirm(otp)
        .then((result: UserCredential) => {
          if (result.user) {
            const { uid } = result.user;

            if (uid) {
              sessionStorage.setItem("uid", uid);
            } else {
              throw new Error("Missing information from Account.");
            }

            setUser({
              uid: uid,
            });
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
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
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };

  return (
    <AuthContext.Provider
      value={{ user, logInWithEmailAndPassword, sendOTP, verifyOTP }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
