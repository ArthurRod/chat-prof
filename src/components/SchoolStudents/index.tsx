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

import "../../styles/table-teacher-students.scss";

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
        <section
          className="school-students"
          aria-label="Seção tabela de estudantes"
        >
          <table className="table" aria-label="Tabela de estudantes">
            <thead className="table-header" aria-label="Cabeçalho da tabela">
              <th className="name" aria-label="Cabeçalho nome">
                Nome
              </th>
              <th
                className="fathers-phone"
                aria-label="Cabeçalho telefone dos pais"
              >
                Telefone dos pais
              </th>
            </thead>

            <tbody aria-label="Corpo da tabela">
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
            </tbody>
          </table>
        </section>
      ) : (
        <section className="empty-table">
          <p>
            Não existem alunos cadastrados... Para cadastrar novos alunos clique
            no botão adicionar abaixo
          </p>
        </section>
      )}
    </>
  );
}
