import { useGrades } from "../../hooks/useGrades";

import "../../styles/student-grades.scss";
import { Grade } from "../../types/Grade";
import { Loading } from "../Loading";
import { StudentGrade } from "./StudentGrade";

interface StudentGradesProps {
  id: string | undefined;
}

export function StudentGrades({ id }: StudentGradesProps) {
  const { loading, grades } = useGrades(id);

  if (loading) return <Loading />;

  return (
    <section className="student-grades">
      <h3 className="title">Notas</h3>
      {grades && grades.length > 0 ? (
        grades.map((grade: Grade) => {
          const key = Math.floor(Date.now() * Math.random()).toString(36);

          return (
            <>
              {parseInt(grade.schoolGrade) > 14 ? (
                <StudentGrade
                  key={key}
                  isBadGrade={false}
                  id={grade.id}
                  teacherName={grade.teacherName}
                  schoolSubject={grade.schoolSubject}
                  period={grade.period}
                  schoolGrade={grade.schoolGrade}
                />
              ) : (
                <StudentGrade
                  key={key}
                  isBadGrade={true}
                  id={grade.id}
                  teacherName={grade.teacherName}
                  schoolSubject={grade.schoolSubject}
                  period={grade.period}
                  schoolGrade={grade.schoolGrade}
                />
              )}
            </>
          );
        })
      ) : (
        <div className="no-grades">
          Não existem notas cadastradas para este aluno
        </div>
      )}
    </section>
  );
}
