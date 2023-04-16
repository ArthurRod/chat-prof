import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { StudentData } from "../types/StudentData";
import { Grade } from "../types/Grade";
import { Observation } from "../types/Observation";

export function useStudent(userPhone: string | undefined) {
  const [studentsData, setStudentsData] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStudentData();
  }, [userPhone]);

  async function getStudentData() {
    if (userPhone) {
      setLoading(true);

      const q = query(
        collection(db, "students"),
        where("fathersPhone", "==", userPhone)
      );

      onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
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

            setLoading(false);
          });
        } else {
          setLoading(false);
        }
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

    const gradesObservationsArray = new Promise<any>((resolve, reject) => {
      const array: any = [];

      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (collectionRef === "grades") {
            const {
              studentId,
              period,
              schoolGrade,
              schoolSubject,
              teacherName,
              teacherId,
            } = doc.data();

            array.push({
              id: id,
              studentId: studentId,
              period: period,
              schoolGrade: schoolGrade,
              schoolSubject: schoolSubject,
              teacherName: teacherName,
              teacherId: teacherId,
            });
          } else if (collectionRef === "observations") {
            const {
              studentId,
              observation,
              observationDate,
              schoolSubject,
              subject,
              teacherName,
              teacherId,
            } = doc.data();

            array.push({
              id: id,
              studentId: studentId,
              observation: observation,
              observationDate: observationDate,
              schoolSubject: schoolSubject,
              subject: subject,
              teacherName: teacherName,
              teacherId: teacherId,
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

  return { loading, studentsData };
}
