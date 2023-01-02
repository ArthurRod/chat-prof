import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { Observation } from "../types/Observation";
import { useAuth } from "./useAuth";

export function useObservations(studentId: string | undefined) {
  const [observations, setObservations] = useState<Observation[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    getObservations();
  }, [studentId, user]);

  function getObservations() {
    if (studentId && user) {
      const q = query(
        collection(db, "observations"),
        where("studentId", "==", studentId),
        where("teacherId", "==", user.uid)
      );

      onSnapshot(q, (querySnapshot) => {
        const observationsArray: Observation[] = [];

        querySnapshot.forEach((doc) => {
          observationsArray.push({
            id: doc.data().id,
            studentId: doc.data().studentId,
            observation: doc.data().observation,
            observationDate: doc.data().observationDate,
            schoolSubject: doc.data().schoolSubject,
            subject: doc.data().subject,
            teacherName: doc.data().teacherName,
            teacherId: doc.data().teacherId,
          });
        });

        setObservations(observationsArray);
      });
    }
  }

  return { observations };
}
