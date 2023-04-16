import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../services/firebase";

import { Observation } from "../types/Observation";
import { useAdminAuth } from "./useAdminAuth";

export function useObservations(studentId: string | undefined) {
  const { adminUserAuth } = useAdminAuth();
  const [observations, setObservations] = useState<Observation[]>([]);
  const [isValidId, setIsValidId] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getObservations();
  }, [studentId, adminUserAuth]);

  function getObservations() {
    if (studentId && adminUserAuth) {
      setLoading(true);

      try {
        const q = query(
          collection(db, "observations"),
          where("studentId", "==", studentId),
          where("teacherId", "==", adminUserAuth.uid)
        );

        onSnapshot(q, (querySnapshot) => {
          const observationsArray: Observation[] = [];

          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const {
                id,
                studentId,
                observation,
                observationDate,
                schoolSubject,
                subject,
                teacherName,
                teacherId,
              } = doc.data();

              observationsArray.push({
                id: id,
                studentId: studentId,
                observation: observation,
                observationDate: observationDate,
                schoolSubject: schoolSubject,
                subject: subject,
                teacherName: teacherName,
                teacherId: teacherId,
              });
            });

            setObservations(observationsArray);

            setIsValidId(true);

            setLoading(false);
          } else {
            setLoading(false);
          }
        });
      } catch (error) {
        console.log(error);

        setLoading(false);
      }
    }
  }

  return { loading, isValidId, observations };
}
