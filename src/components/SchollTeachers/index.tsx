import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { db } from "../../services/firebase";

import { DeleteTeacher } from "../Modal/DeleteTeacher";
import { useAuth } from "../../hooks/useAuth";
import { AdminUser } from "../../types/AdminUser";

import "../../styles/scholl-teachers-students.scss";

export function SchollTeachers() {
  const { user } = useAuth();
  const [schollTeachers, setSchollTeachers] = useState<AdminUser[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "teachers"),
      where("schollId", "==", user?.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let teachersArray: AdminUser[] = [];

      querySnapshot.forEach((doc) => {
        teachersArray.push({
          uid: doc.data().uid,
          name: doc.data().name,
          phone: doc.data().phone,
          email: doc.data().email,
        });
      });

      setSchollTeachers(teachersArray);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <>
      {schollTeachers.length > 0 ? (
        <section className="scholl-teachers-students">
          <header className="table-header">
            <span className="name">
              <b>Nome</b>
            </span>
            <span className="email">
              <b>E-mail</b>
            </span>
            <span className="phone">
              <b>Telefone</b>
            </span>
            <span className="delete"></span>
          </header>

          {schollTeachers.map((key: any) => (
            <div key={key.uid} className="row">
              <Link
                className="row-link"
                target="_self"
                to={`/edit/teacher/${key.uid}`}
              >
                <span className="name">{key.name}</span>
                <span className="email">{key.email}</span>
                <span className="phone">{key.phone}</span>
              </Link>
              <DeleteTeacher teacherId={key.uid} teacherName={key.name} />
            </div>
          ))}
        </section>
      ) : (
        <section className="scholl-no-list">
          <p>
            Não existem professores cadastrados nesta escola... Para cadastrar
            novos professores clique no botão adicionar abaixo
          </p>
        </section>
      )}
    </>
  );
}
