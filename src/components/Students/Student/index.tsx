import { useEffect, useState } from "react";
import { convertTime } from "../../../helpers/convertTime";
import { handleOrderObservations } from "../../../helpers/handleOrderObservations";
import { Grade } from "../../../types/Grade";
import { Observation } from "../../../types/Observation";

import "../../../styles/student.scss"
import { useStudent } from "../../../hooks/useStudent";

interface StudentProps {
	data: any;
  studentName: string;
  grades: Grade[];
  observations: Observation[];
}

export function Student({ data, studentName, grades, observations }: StudentProps) {
  const [orderObservations, setOrderObservations] = useState<Observation[]>([]);

  useEffect(() => {
    handleOrderObservations(observations, setOrderObservations);
  }, [observations]);

	console.log(data[0])

  return (
    <div className="student">
      <h3 className="name">{studentName}</h3>
      {grades.length > 0 ? (
        <div className="grades">
					<h3 className="title">Notas</h3>
          {grades.map((key: any, index: any) => (
            <div key={index} className="grade">
              <div className="data period">
                <span>
                  <strong>Período: </strong>
                </span>
                <span>{key.period}</span>
              </div>
              <div className="data teacher-name">
                <span>
                  <strong>Professor: </strong>
                </span>
                <span>{key.teacherName}</span>
              </div>
              <div className="data school-subject">
                <span>
                  <strong>Matéria: </strong>
                </span>
                <span>{key.schoolSubject}</span>
              </div>
              <div className="data school-grade">
                <span>
                  <strong>Nota: </strong>
                </span>
                <span>{key.schoolGrade} pts</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span className="no-grades">
          Ainda não foram cadastradas notas para este aluno
        </span>
      )}
      {orderObservations.length > 0 ? (
        <div className="observations">
					<h3 className="title">Observações</h3>
          {orderObservations.map((key: any, index: any) => (
            <div key={index} className="observation">
              <div className="data subject">
                <h3>{key.subject}</h3>
              </div>
              <div className="data data">
                <span>
                  <strong>Data: </strong>
                </span>
                <span>{convertTime(key.observationDate.seconds)}</span>
              </div>
              <div className="data teacher-name">
                <span>
                  <strong>Professor: </strong>
                </span>
                <span>{key.teacherName}</span>
              </div>
              <div className="data school-subject">
                <span>
                  <strong>Matéria: </strong>
                </span>
                <span>{key.schoolSubject}</span>
              </div>
              <div className="data observation">
                <p>{key.observation}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span className="no-observations">
          Ainda não foram cadastradas observações para este aluno
        </span>
      )}
    </div>
  );
}
