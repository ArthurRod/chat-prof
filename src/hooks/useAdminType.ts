import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

type AdminUserType = {
    type: string;
}

export function useAdminType() {
  const { user } = useAuth();
  const [adminType, setAdminType] = useState<AdminUserType | null>(null);

  useEffect(() => {
    getAdminData();
  }, [user]);

  const getAdminData = async () => {
    if (user) {
      let userId = user.uid;
      let userEmail = user.email;

      const docRef = doc(db, "escolas", userId, "admin-users", userEmail);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        setAdminType({
          type: userData.type
        });

      } else {
        console.log("Usuário não encontrado!");
      }
    }
  };

  return { adminType }
}
