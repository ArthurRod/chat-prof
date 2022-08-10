import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { AdminUser } from "../types/AdminUser";

export function useAdmin() {
  const { user } = useAuth();
  const [adminUser, setAdminUser] = useState<AdminUser>();

  useEffect(() => {
    
    getAdminData()

  }, [user]);

  const getAdminData = async () => {
    const userId = user?.uid!;

    if(userId) {
      const docRef = doc(db, "escolas", userId);
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
        console.log("Não foi encontrado um documento!");
      }
    }
  }

  return { adminUser, setAdminUser };
}
