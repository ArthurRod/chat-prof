import { createContext, useState } from "react";
import { signInWithEmailAndPassword, auth } from "../services/firebase";
import { User } from "../types/User";
import { AuthContextProvider } from "../types/AuthContextProvider";
import { AuthAdminContextType } from "../types/AuthAdminContextType";

export const AuthAdminContext = createContext({} as AuthAdminContextType);

export function AuthAdminProvider(props: AuthContextProvider) {
  const [user, setUser] = useState<User>();

  const logInWithEmailAndPassword = async (typedEmail: string, password: string) => {

    const result = await signInWithEmailAndPassword(auth, typedEmail, password)

    if (result.user) {
			const { uid, email } = result.user

			if (!uid || !email) {
				throw new Error('Missing user information.');
			}

			setUser({
        uid: uid,
        email: email
      })
      
		}
  };

  return (
    <AuthAdminContext.Provider value={{ user, logInWithEmailAndPassword }}>
      {props.children}
    </AuthAdminContext.Provider>
  );
}
