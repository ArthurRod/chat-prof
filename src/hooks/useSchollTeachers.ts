import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

import { useAuth } from "./useAuth";
import { AdminUser } from "../types/AdminUser";

export function useSchollTeachers() {
  const { user } = useAuth();
  const [schollTeachers, setSchollTeachers] = useState<AdminUser[]>([]);

  useEffect(() => {
    getSchollTeachers();
  }, [user]);

  const getSchollTeachers = async () => {
    if (user) {
      let collectionRef = collection(db, "teachers");
      const querySnapshot = await getDocs(collectionRef);

      let teachersArray: AdminUser[] = [];

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let docData = doc.data();      

        if (docData.schollId === user.uid) {

          teachersArray.push({
            name: docData.name,
            phone: docData.phone,
            email: docData.email
          });

        }
      });

      setSchollTeachers(teachersArray);
    }
  };

  return { schollTeachers };
}
