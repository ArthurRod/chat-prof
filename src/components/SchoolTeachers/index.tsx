import { useEffect, useState } from "react";
import {
  collection,
  db,
  onSnapshot,
  query,
  where,
} from "../../services/firebase";

import { AdminUser } from "../../types/AdminUser";
import { useAuth } from "../../hooks/useAuth";
import { SchoolTeacher } from "./SchoolTeacher";

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

          {schoolTeachers.map((schoolTeacher: AdminUser, i: number) => {
            const { uid, name, phone, email } = schoolTeacher;

            return (
              <SchoolTeacher
                key={i}
                teacherId={uid}
                teacherName={name}
                teacherPhone={phone}
                teacherEmail={email}
              />
            );
          })}
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
