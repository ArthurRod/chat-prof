import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

type AdminType = {
  isAdmin: boolean;
  type: string;
};

export function useAdmin() {
  const { user } = useAuth();
  const [admin, setAdmin] = useState<AdminType | null>(null);

  useEffect(() => {
    getAdmin();
  }, [user]);

  const getAdmin = async () => {
    if (user) {
      let userId = user.uid;

      const docRef = doc(db, "admin-users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        setAdmin({
          isAdmin: userData.isAdmin,
          type: userData.type
        });

      } else {
        console.log("Usuário admin não encontrado!");
      }
    }
  };

  return { admin };
}
