import { createContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "../types/User";
import { ReactNode } from "react";

type AdminContextType = {
  user: User | undefined;
};

type AdminContextProvider = {
  children: ReactNode;
};

export const AdminContext = createContext({} as AdminContextType);

export function AuthProvider(props: AdminContextProvider) {
  const [user, setUser] = useState<User>();

 



  return (
    <AdminContext.Provider value={{ user }}>
      {props.children}
    </AdminContext.Provider>
  );
}
