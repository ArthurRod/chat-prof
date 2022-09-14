import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { AdminUser } from "../types/AdminUser";

export function useScholl() {
  const { user } = useAuth();
  const [scholl, setScholl] = useState<AdminUser | null>(null);

  useEffect(() => {
    getSchollData();
  }, [user]);

  const getSchollData = async () => {
    if (user) {
      let docRef = doc(db, "escolas", user.uid.toString());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        setScholl({
          schollId: user.uid,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
        });

      } else {

        console.log("Dados da escola não encontrados!");
        
      }
    }
  };

  return { scholl, setScholl };
}
