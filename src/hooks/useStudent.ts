import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { StudentData } from "../types/StudentData";

export function useStudent(userPhone: string | undefined) {
  const [studentsData, setStudentsData] = useState<StudentData[]>([]);

  useEffect(() => {
    getStudentData();
  }, [userPhone]);

  async function getStudentData() {
    if (userPhone) {
      const q = query(
        collection(db, "students"),
        where("fathersPhone", "==", userPhone)
      );

      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          const id = doc.data().id;
          const gradesData = await getStudentGradesObservations(id, "grades");
          const observationsData = await getStudentGradesObservations(
            id,
            "observations"
          );

          setStudentsData((studentsData) => [
            ...studentsData,
            {
              studentName: doc.data().name,
              grades: gradesData,
              observations: observationsData,
            },
          ]);
        });
      });
    }
  }

  async function getStudentGradesObservations(
    id: string,
    collectionRef: string
  ) {
    const q = query(
      collection(db, collectionRef),
      where("studentId", "==", id)
    );

    const gradesObservationsArray = new Promise<any[]>((resolve, reject) => {
      const array: any[] = [];

      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (collectionRef === "grades") {
            array.push({
              id: doc.id,
              studentId: doc.data().studentId,
              period: doc.data().period,
              schoolGrade: doc.data().schoolGrade,
              schoolSubject: doc.data().schoolSubject,
              teacherName: doc.data().teacherName,
              teacherId: doc.data().teacherId,
            });
          } else if (collectionRef === "observations") {
            array.push({
              id: doc.data().id,
              studentId: doc.data().studentId,
              observation: doc.data().observation,
              observationDate: doc.data().observationDate,
              schoolSubject: doc.data().schoolSubject,
              subject: doc.data().subject,
              teacherName: doc.data().teacherName,
              teacherId: doc.data().teacherId,
            });
          }
        });

        if (array.length > 0) {
          resolve(array);
        } else {
          reject([]);
        }
      });
    });

    return gradesObservationsArray;
  }

  return { studentsData };
}
