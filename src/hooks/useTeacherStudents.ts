import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "./useAuth";
import { Student } from "../types/Student";

export function useTeacherStudents() {
  const { user } = useAuth();
  const [teacherStudents, setTeacherStudents] = useState<Student[]>([]);
  const [isModified, setIsModified] = useState<Boolean>(false);

  useEffect(() => {
    getTeacherStudents();
  }, [user, isModified]);

  const getTeacherStudents = async () => {
    if (user) {
      let collectionRef = collection(db, "teachers", user.uid, "students");
      const querySnapshot = await getDocs(collectionRef);

      let studentsArray: Student[] = [];

      querySnapshot.forEach((doc) => {
        let docData = doc.data();

        studentsArray.push({
          id: docData.id,
          name: docData.name,
          fathersPhone: docData.fathersPhone,
          schollId: docData.schollId,
        });
      });

      setTeacherStudents(studentsArray);
      setIsModified(false);
    }
  };

  return { teacherStudents, setIsModified };
}
