import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { StudentData } from "../types/StudentData";

export function useStudent(userPhone: string | undefined) {
  const [studentsData, setStudentsData] = useState<StudentData[]>([]);
  const [loadindStudentsData, setLoadindStudentsData] = useState(true);

  useEffect(() => {
    getStudentData().then(() => setLoadindStudentsData(false));
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
          const gradesData = await getStudentGradesObservations("grades", id);
          const observationsData = await getStudentGradesObservations(
            "observations",
            id
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
    collectionRef: string,
    id: string
  ) {
    const q = query(
      collection(db, collectionRef),
      where("studentId", "==", id)
    );

    const gradesObservationsArray = new Promise<any[]>((resolve, reject) => {
      const array: any[] = [];

      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          if (collectionRef === "grades") {
            array.push({
              id: id,
              studentId: data.studentId,
              period: data.period,
              schoolGrade: data.schoolGrade,
              schoolSubject: data.schoolSubject,
              teacherName: data.teacherName,
              teacherId: data.teacherId,
            });
          } else if (collectionRef === "observations") {
            array.push({
              id: id,
              studentId: data.studentId,
              observation: data.observation,
              observationDate: data.observationDate,
              schoolSubject: data.schoolSubject,
              subject: data.subject,
              teacherName: data.teacherName,
              teacherId: data.teacherId,
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
  console.log(loadindStudentsData);

  return { loadindStudentsData, studentsData };
}
