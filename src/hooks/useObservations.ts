import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { Observation } from "../types/Observation";

export function useObservations(id: string | undefined) {
  const [observations, setObservations] = useState<Observation[]>([]);

  useEffect(() => {

    getObservations();

  }, [id])

  function getObservations() {
    const q = query(
      collection(db, "observations"),
      where("studentId", "==", id)
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
          teacherName: doc.data().teacherName
        });

      });

      setObservations(observationsArray);
    })
  }

  return { observations };
}
