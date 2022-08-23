import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { AdminUser } from "../types/AdminUser";

export function useScholl() {
  const { user } = useAuth();
  const [scholl, setScholl] = useState<AdminUser | null>(null);

  useEffect(() => {
    getAdminData();
  }, [user]);

  const getAdminData = async () => {
    if (user) {
      const docRef = doc(db, "escolas", user.uid.toString());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        setScholl({
          name: userData.name,
          email: userData.email,
          phone: userData.phone
        });

      } else {
        console.log("Usuário não encontrado!");
      }
    }
  };

  return { scholl, setScholl }
}
