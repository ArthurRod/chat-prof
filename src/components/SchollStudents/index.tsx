import { Link } from "react-router-dom";
import "../../styles/scholl-teachers.scss";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { db } from "../../services/firebase";
import { Student } from "../../types/Student";

import "../../styles/scholl-students.scss";
import { DeleteStudent } from "../Modal/DeleteStudent";

type SchollStudentsProps = {
  schollId: string | undefined;
};

export function SchollStudents({ schollId }: SchollStudentsProps) {
  const [schollStudents, setSchollStudents] = useState<Student[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "students"),
      where("schollId", "==", schollId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const studentsArray: Student[] = [];

      querySnapshot.forEach((doc) => {
        studentsArray.push({
          id: doc.data().id,
          name: doc.data().name,
          fathersPhone: doc.data().fathersPhone,
          schollId: doc.data().schollId,
        });
      });

      setSchollStudents(studentsArray);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {schollStudents.length > 0 ? (
        <section className="scholl-students">
          <header className="table-header">
            <span className="name">
              <b>Nome</b>
            </span>

            <span className="fathers-phone">
              <b>Telefone dos pais</b>
            </span>

            <span className="delete"></span>
          </header>

          {schollStudents.map((key: any) => (
            <div key={key.id} className="student">
              <Link
                className="student-link"
                target="_self"
                to={`./edit/${key.id}`}
              >
                <span className="name">{key.name}</span>
                <span className="fathers-phone">{key.fathersPhone}</span>
              </Link>
              <DeleteStudent studentId={key.id} studentName={key.name} />
            </div>
          ))}
        </section>
      ) : (
        <section className="scholl-no-students">
          <p>
            Não existem alunos cadastrados... Para cadastrar novos alunos clique
            no botão adicionar abaixo
          </p>
        </section>
      )}
    </>
  );
}
