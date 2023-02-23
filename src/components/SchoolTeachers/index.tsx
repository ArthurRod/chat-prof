import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { db } from "../../services/firebase";

import { DeleteTeacher } from "../Modal/DeleteTeacher";
import { useAuth } from "../../hooks/useAuth";
import { AdminUser } from "../../types/AdminUser";

import "../../styles/school-teachers-students.scss";

export function SchoolTeachers() {
  const { user } = useAuth();
  const [schoolTeachers, setSchoolTeachers] = useState<AdminUser[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "teachers"),
      where("schoolId", "==", user?.uid)
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

      setSchoolTeachers(teachersArray);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <>
      {schoolTeachers.length > 0 ? (
        <section className="school-teachers-students">
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

          {schoolTeachers.map((schoolTeacher: any) => (
            <div key={schoolTeacher.uid} className="row">
              <Link
                className="row-link"
                target="_self"
                to={`/edit/teacher/${schoolTeacher.uid}`}
              >
                <span className="name">{schoolTeacher.name}</span>
                <span className="email">{schoolTeacher.email}</span>
                <span className="phone">{schoolTeacher.phone}</span>
              </Link>
              <DeleteTeacher
                teacherId={schoolTeacher.uid}
                teacherName={schoolTeacher.name}
              />
            </div>
          ))}
        </section>
      ) : (
        <section className="school-no-list">
          <p>
            Não existem professores cadastrados nesta escola... Para cadastrar
            novos professores clique no botão adicionar abaixo
          </p>
        </section>
      )}
    </>
  );
}
