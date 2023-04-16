import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

import { useAdminAuth } from "./useAdminAuth";

export function useAdminType() {
  const { adminUserAuth } = useAdminAuth();
  const [adminType, setAdminType] = useState<string | undefined>(undefined);
  const [loadingAdminType, setLoadingAdminType] = useState(false);

  useEffect(() => {
    getAdminType();
  }, [adminUserAuth]);

  const getAdminType = async () => {
    if (adminUserAuth) {
      setLoadingAdminType(true);

      try {
        const { uid } = adminUserAuth;

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
