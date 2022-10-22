import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { AdminUserTeacher } from "../types/AdminUserTeacher";

export function useTeacher() {
  const { user } = useAuth();
  const [teacher, setTeacher] = useState<AdminUserTeacher | null>(null);

  useEffect(() => {
    getTeacherData();
  }, []);

  const getTeacherData = async () => {
    if (user) {
      const docRef = doc(db, "teachers", user.uid.toString());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        setTeacher({
          uid: user.uid,
          schollId: userData.schollId,
          name: userData.name,
          email: userData.email,
          phone: userData.phone
        });

      } else {

        console.log("Não foi possível encontrar os dados do professor");
        
      }
    }
  };

  return { teacher, setTeacher };
}
