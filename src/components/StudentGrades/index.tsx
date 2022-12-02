import { useParams } from "react-router-dom";
import { useGrades } from "../../hooks/useGrades";

export function StudentGrades() {
  const { id } = useParams();
  const { grades } = useGrades(id);

  return (
    <>
        {grades && grades.length > 0 ? 
            grades.map((key: any) => (
                <div className="student-grades">
                    <div className="teacher-name">Professor: {key.teacherName}</div>
                    <div className="scholl-subject">Matéria: {key.schollSubject}</div>
                    <div className="period">Período: {key.period}</div>
                    <div className="scholl-grade">Nota: {key.schollGrade}</div>
                </div>
            ))
        :
            <div className="student-no-grades">Não existem notas cadastradas para este aluno</div>
        }
    </>
  )
}
