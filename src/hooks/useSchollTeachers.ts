import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "./useAuth";
import { AdminUser } from "../types/AdminUser";

export function useSchollTeachers() {
  const { user } = useAuth();
  const [schollTeachers, setSchollTeachers] = useState<AdminUser[]>([]);
  const [isModified, setIsModified] = useState<Boolean>(false);

  useEffect(() => {
    getSchollTeachers();
  }, [user, isModified]);

  const getSchollTeachers = async () => {
    if (user) {
      let collectionRef = collection(db, "teachers");
      const querySnapshot = await getDocs(collectionRef);

      let teachersArray: AdminUser[] = [];

      querySnapshot.forEach((doc) => {
        
        let docData = doc.data();      

        if (docData.schollId === user.uid) {

          teachersArray.push({
            uid: docData.uid,
            name: docData.name,
            phone: docData.phone,
            email: docData.email
          });

        }
      });

      setSchollTeachers(teachersArray);
      setIsModified(false)
    }
  };

  return { schollTeachers, setIsModified };
}
