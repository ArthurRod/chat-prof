import { useEffect, useState } from "react";

import { convertTime } from "../../../helpers/convertTime";
import { handleOrderObservations } from "../../../helpers/handleOrderObservations";
import { Grade } from "../../../types/Grade";
import { Observation } from "../../../types/Observation";

import "../../../styles/student.scss";

interface StudentProps {
  studentName: string;
  grades: Grade[];
  observations: Observation[];
}

export function Student({ studentName, grades, observations }: StudentProps) {
  const [orderObservations, setOrderObservations] = useState<Observation[]>([]);

  useEffect(() => {
    handleOrderObservations(observations, setOrderObservations);
  }, [observations]);

  return (
    <div className="student">
      <h3 className="name">{studentName}</h3>
      {grades.length > 0 ? (
        <div className="grades">
          <h3 className="title">Notas</h3>
          {grades.map((grade: Grade, index: any) => (
            <div key={index} className="grade">
              <div className="data period">
                <span>
                  <strong>Período: </strong>
                </span>
                <span>{grade.period}</span>
              </div>
              <div className="data teacher-name">
                <span>
                  <strong>Professor: </strong>
                </span>
                <span>{grade.teacherName}</span>
              </div>
              <div className="data school-subject">
                <span>
                  <strong>Matéria: </strong>
                </span>
                <span>{grade.schoolSubject}</span>
              </div>
              <div className="data school-grade">
                <span>
                  <strong>Nota: </strong>
                </span>
                <span>{grade.schoolGrade} pts</span>
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
          {orderObservations.map(
            (orderObservation: Observation, index: any) => (
              <div key={index} className="observation">
                <div className="data subject">
                  <h3>{orderObservation.subject}</h3>
                </div>
                <div className="data data">
                  <span>
                    <strong>Data: </strong>
                  </span>
                  <span>
                    {convertTime(orderObservation.observationDate.seconds)}
                  </span>
                </div>
                <div className="data teacher-name">
                  <span>
                    <strong>Professor: </strong>
                  </span>
                  <span>{orderObservation.teacherName}</span>
                </div>
                <div className="data school-subject">
                  <span>
                    <strong>Matéria: </strong>
                  </span>
                  <span>{orderObservation.schoolSubject}</span>
                </div>
                <div className="data observation">
                  <p>{orderObservation.observation}</p>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <span className="no-observations">
          Ainda não foram cadastradas observações para este aluno
        </span>
      )}
    </div>
  );
}
