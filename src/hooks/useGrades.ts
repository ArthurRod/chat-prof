import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { Grade } from "../types/Grade";

export function useGrades(id: string | undefined) {
  const [grades, setGrades] = useState<Grade[]>([]);

  useEffect(() => {

    getGrades();

  }, [id])

  function getGrades() {
    const q = query(
      collection(db, "grades"),
      where("id", "==", id)
    );

    onSnapshot(q, (querySnapshot) => {
      const gradesArray: Grade[] = [];

      querySnapshot.forEach((doc) => {

        gradesArray.push({
          id: doc.data().id,
          period: doc.data().period,
          schoolGrade: doc.data().schoolGrade,
          schoolSubject: doc.data().schoolSubject,
          teacherName: doc.data().teacherName
        });

      });

      setGrades(gradesArray);
    })
  }

  return { grades };
}
