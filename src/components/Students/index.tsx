import { StudentData } from "../../types/StudentData";
import { Student } from "./Student";

import "../../styles/students.scss";
import { useStudent } from "../../hooks/useStudent";
import { Loading } from "../Loading";

interface StudentsProps {
  userName: string | undefined;
  userPhone: string | undefined;
}

export function Students({ userName, userPhone }: StudentsProps) {
  const { loadindStudentsData, studentsData } = useStudent(userPhone);

  if (loadindStudentsData) return <Loading />;

  return (
    <section className="students">
      {studentsData && studentsData.length > 0 ? (
        <>
          <p className="title">
            Olá {userName ? userName : "usuário"}! abaixo estão os dados de
            desempenho escolar
            {studentsData.length === 1
              ? " do seu filho(a)."
              : " dos seus filhos(as)."}
          </p>
          {studentsData.map((studentData: StudentData, index: number) => (
            <Student
              key={index}
              studentName={studentData.studentName}
              grades={studentData.grades}
              observations={studentData.observations}
            />
          ))}
        </>
      ) : (
        <>
          {!loadindStudentsData && (
            <p className="title-no-students">
              Olá {userName ? userName : "usuário"}! Não foram encontrado(s)
              alunos cadastrados no sistema com este número de telefone.
            </p>
          )}
        </>
      )}
    </section>
  );
}
