import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { User } from "../types/User";

type AdminType = {
  isAdmin: boolean;
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
    let adminTypeItem = sessionStorage.getItem("adminType");
    let isAdminItem = sessionStorage.getItem("isAdmin");

    if (
      adminTypeItem &&
      adminTypeItem.length > 0 &&
      isAdminItem &&
      isAdminItem.length > 0
    ) {
      let isAdminItemBool = isAdminItem!.toLowerCase() === "true";

      setAdminType({
        isAdmin: isAdminItemBool,
        type: adminTypeItem,
      });
      
    } else {
      let userId = user.uid;
      const docRef = doc(db, "admin-users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        setAdminType({
          isAdmin: userData.isAdmin,
          type: userData.type,
        });

        sessionStorage.setItem("isAdmin", userData.isAdmin);
        sessionStorage.setItem("adminType", userData.type);
      } else {
        console.log("Usuário admin não encontrado!");
      }
    }

    return adminType;
  };

  return { adminType, getAdminType };
}
