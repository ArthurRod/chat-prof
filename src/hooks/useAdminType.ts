import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

import { User } from "../types/User";
import { useAuth } from "./useAuth";

export function useAdminType() {
  const { user } = useAuth();
  const [adminType, setAdminType] = useState<string | undefined>(undefined);
  const [loadingAdminType, setLoadingAdminType] = useState(false);

  useEffect(() => {
    getAdminType(user);
  }, [user]);

  const getAdminType = async (user: User | undefined) => {
    if (user) {
      setLoadingAdminType(true);

      try {
        const { uid } = user;

        const docRef = doc(db, "admin-users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          const { type } = userData;

          setAdminType(type);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingAdminType(false);
      }
    }
  };

  return { loadingAdminType, adminType };
}
