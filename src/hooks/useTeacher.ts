import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { AdminUser } from "../types/AdminUser";

export function useTeacher() {
  const { user } = useAuth();
  const [teacher, setTeacher] = useState<AdminUser | null>(null);
  const [schollId, setSchollId] = useState<string>("");

  useEffect(() => {
    const getTeacher = async () => {
      getSchollId()
        .then(() => {
          getTeacherData();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getTeacher();
  }, [user]);

  const getSchollId = async () => {
    if (user) {
      const docRef = doc(db, "teachers", user.uid.toString());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        
        setSchollId(userData.schollId);
      } else {
        console.log("Dados da escola não encontrados!");
      }
    }
  };

  const getTeacherData = async () => {
    console.log(schollId); //Quando recarrega não tenho essa informação

    if (user) {
      const docRef = doc(
        db,
        "escolas",
        schollId,
        "teachers",
        user.uid.toString()
      );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        setTeacher({
          schollId: schollId,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
        });
      } else {
        console.log("Dados do professor não encontrados!");
      }
    }
  };

  return { teacher, setTeacher };
}
