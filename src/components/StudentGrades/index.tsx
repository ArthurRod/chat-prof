import { useParams } from "react-router-dom";
import { useGrades } from "../../hooks/useGrades";

import '../../styles/student-grades.scss'

export function StudentGrades() {
  const { id } = useParams();
  const { grades } = useGrades(id);

  return (
    <section className="student-grades">
        <h3 className="title">Notas</h3>
        {grades && grades.length > 0 ? 
            grades.map((key: any, index: any) => (
                <>
                    {
                        key.schoolGrade > 14 ? (
                            <div key={index} className="grade">
                                <span className="teacher-name">Professor: {key.teacherName}</span>
                                <span className="school-subject">Matéria: {key.schoolSubject}</span>
                                <span className="period">Período: {key.period}</span>
                                <span className="school-grade">Nota: {key.schoolGrade} pts</span>
                            </div>
                        ) 
                        : 
                        (
                            <div key={index} className="grade bad-grade">
                                <span className="teacher-name">Professor: {key.teacherName}</span>
                                <span className="school-subject">Matéria: {key.schoolSubject}</span>
                                <span className="period">Período: {key.period}</span>
                                <span className="school-grade">Nota: {key.schoolGrade} pts</span>
                            </div>
                        )
                    }
                    
                </>        
            ))
        :
            <div className="no-grades">Não existem notas cadastradas para este aluno</div>
        }
    </section>
  )
}
