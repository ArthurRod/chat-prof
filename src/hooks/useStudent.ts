import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { StudentData } from "../types/StudentData";

export function useStudent(userPhone: string | undefined) {
  const [studentsData, setStudentsData] = useState<StudentData[]>([]);

  useEffect(() => {
    getStudentData();
  }, [userPhone]);

  function getStudentData() {
    if (userPhone) {
      const q = query(
        collection(db, "students"),
        where("fathersPhone", "==", userPhone)
      );

      onSnapshot(q, (querySnapshot) => {
        const studentsArray: StudentData[] = [];

        querySnapshot.forEach((doc) => {
          const id = doc.data().id;
          const gradesData = getStudentGradesObservations(id, "grades");
          const observationsData = getStudentGradesObservations(
            id,
            "observations"
          );

          studentsArray.push({
            studentName: doc.data().name,
            grades: gradesData,
            observations: observationsData,
          });
        });

        setStudentsData(studentsArray);
      });
    }
  }

  function getStudentGradesObservations(id: string, collectionRef: string) {
    const q = query(
      collection(db, collectionRef),
      where("studentId", "==", id)
    );
    const gradesObservationsArray: any[] = [];

    onSnapshot(q, (querySnapshot) => {

      querySnapshot.forEach((doc) => {
        if (collectionRef === "grades") {
            
          gradesObservationsArray.push({
            id: doc.id,
            studentId: doc.data().studentId,
            period: doc.data().period,
            schoolGrade: doc.data().schoolGrade,
            schoolSubject: doc.data().schoolSubject,
            teacherName: doc.data().teacherName,
            teacherId: doc.data().teacherId,
          });

        } else if (collectionRef === "observations") {

          gradesObservationsArray.push({
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
    });

    return gradesObservationsArray
  }

  return { studentsData };
}
