import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { User } from "../types/User";

type AdminType = {
  type: string;
};

export function useAdminType() {
  const { user } = useAuth();
  const [adminType, setAdminType] = useState<AdminType | null>(null);

  useEffect(() => {

    if (user) {
      getAdminType(user);
    }
    
  }, [user]);

  const getAdminType = async (user: User) => {
    const userId = user.uid;
    const docRef = doc(db, "admin-users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();

      setAdminType({
        type: userData.type,
      });

    } else {
      console.log("Usuário admin não encontrado!");
    }

    return adminType;
  };

  return { adminType, getAdminType };
}
