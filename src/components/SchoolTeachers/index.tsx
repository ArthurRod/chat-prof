import { useEffect, useState } from "react";
import {
  collection,
  db,
  onSnapshot,
  query,
  where,
} from "../../services/firebase";

import { AdminUser } from "../../types/AdminUser";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import { SchoolTeacher } from "./SchoolTeacher";

import "../../styles/table-teacher-students.scss";

export function SchoolTeachers() {
  const { user } = useAdminAuth();
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
        <section
          className="school-teachers"
          aria-label="Seção tabela de professores"
        >
          <table className="table" aria-label="Tabela de professores">
            <thead className="table-header" aria-label="Cabeçalho da tabela">
              <th className="name" aria-label="Cabeçalho nome">
                Nome
              </th>
              <th className="email" aria-label="Cabeçalho e-mail">
                E-mail
              </th>
              <th className="phone" aria-label="Cabeçalho telefone">
                Telefone
              </th>
            </thead>

            <tbody aria-label="Corpo da tabela">
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
            </tbody>
          </table>
        </section>
      ) : (
        <section className="empty-table">
          <p>
            Não existem professores cadastrados nesta escola... Para cadastrar
            novos professores clique no botão adicionar abaixo
          </p>
        </section>
      )}
    </>
  );
}
