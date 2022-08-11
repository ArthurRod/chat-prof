import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { AdminUser } from "../types/AdminUser";

export function useAdmin() {
  console.log("Executou useAdmin")
  const { user } = useAuth();
  const [adminUser, setAdminUser] = useState<AdminUser>();

  useEffect(() => {
    getAdminData();
  }, [user]);

  const getAdminData = async () => {
    if (user) {
      const docRef = doc(db, "escolas", user.uid!);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        setAdminUser({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          type: userData.type,
        });

      } else {
        console.log("Usuário não encontrado!");
      }
    }
  };

  return { adminUser, setAdminUser }
}
