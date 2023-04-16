import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../services/firebase";

import { Grade } from "../types/Grade";
import { useAdminAuth } from "./useAdminAuth";

export function useGrades(studentId: string | undefined) {
  const { adminUserAuth } = useAdminAuth();
  const [grades, setGrades] = useState<Grade[]>([]);
  const [isValidId, setIsValidId] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getGrades();
  }, [studentId, adminUserAuth]);

  function getGrades() {
    if (studentId && adminUserAuth) {
      setLoading(true);

      try {
        const q = query(
          collection(db, "grades"),
          where("studentId", "==", studentId),
          where("teacherId", "==", adminUserAuth.uid)
        );

        onSnapshot(q, (querySnapshot) => {
          const gradesArray: Grade[] = [];

          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const {
                studentId,
                period,
                schoolGrade,
                schoolSubject,
                teacherName,
                teacherId,
              } = doc.data();

              gradesArray.push({
                id: doc.id,
                studentId: studentId,
                period: period,
                schoolGrade: schoolGrade,
                schoolSubject: schoolSubject,
                teacherName: teacherName,
                teacherId: teacherId,
              });
            });

            setGrades(gradesArray);

            setIsValidId(true);

            setLoading(false);
          } else {
            setLoading(false);
          }
        });
      } catch (error) {
        setLoading(false);

        console.log(error);
      }
    }
  }

  return { loading, isValidId, grades };
}
