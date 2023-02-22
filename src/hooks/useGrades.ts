import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../services/firebase";

import { Grade } from "../types/Grade";
import { useAuth } from "./useAuth";

export function useGrades(studentId: string | undefined) {
  const { user } = useAuth();
  const [grades, setGrades] = useState<Grade[]>([]);
  const [isValidId, setIsValidId] = useState(false);

  useEffect(() => {
    getGrades();
  }, [studentId, user]);

  function getGrades() {
    if (studentId && user) {
      const q = query(
        collection(db, "grades"),
        where("studentId", "==", studentId),
        where("teacherId", "==", user.uid)
      );

      onSnapshot(q, (querySnapshot) => {
        const gradesArray: Grade[] = [];

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            gradesArray.push({
              id: doc.id,
              studentId: doc.data().studentId,
              period: doc.data().period,
              schoolGrade: doc.data().schoolGrade,
              schoolSubject: doc.data().schoolSubject,
              teacherName: doc.data().teacherName,
              teacherId: doc.data().teacherId,
            });
          });

          setGrades(gradesArray);

          setIsValidId(true);
        }
      });
    }
  }

  return { isValidId, grades };
}
