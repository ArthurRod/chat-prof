import { useEffect, useState } from "react";
import {
  collection,
  db,
  query,
  onSnapshot,
  where,
} from "../../services/firebase";

import { Student } from "../../types/Student";
import { SchoolStudent } from "./SchoolStudent";

import "../../styles/school-teachers-students.scss";

type SchoolStudentsProps = {
  schoolId: string | undefined;
};

export function SchoolStudents({ schoolId }: SchoolStudentsProps) {
  const [schoolStudents, setSchoolStudents] = useState<Student[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "students"),
      where("schoolId", "==", schoolId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const studentsArray: Student[] = [];

      querySnapshot.forEach((doc) => {
        studentsArray.push({
          id: doc.data().id,
          name: doc.data().name,
          fathersPhone: doc.data().fathersPhone,
          schoolId: doc.data().schoolId,
        });
      });

      setSchoolStudents(studentsArray);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {schoolStudents.length > 0 ? (
        <section className="school-teachers-students">
          <header className="table-header">
            <span className="name">
              <b>Nome</b>
            </span>

            <span className="fathers-phone">
              <b>Telefone dos pais</b>
            </span>

            <span className="delete"></span>
          </header>

          {schoolStudents.map((schoolStudent: Student, i: number) => {
            const { id, name, fathersPhone } = schoolStudent;

            return (
              <SchoolStudent
                key={i}
                studentId={id}
                studentName={name}
                studentFathersPhone={fathersPhone}
              />
            );
          })}
        </section>
      ) : (
        <section className="school-no-list">
          <p>
            Não existem alunos cadastrados... Para cadastrar novos alunos clique
            no botão adicionar abaixo
          </p>
        </section>
      )}
    </>
  );
}
