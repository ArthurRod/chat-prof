import { useParams } from "react-router-dom";
import { useObservations } from "../../hooks/useObservations";
import { useState } from "react";
import { Observation } from "../../types/Observation";
import { useEffect } from "react";

import "../../styles/student-observations.scss";
import { StudentObservation } from "./StudentObservation";

export function StudentObservations() {
  const { id } = useParams();
  const { observations } = useObservations(id);
  const [orderObservations, setOrderObservations] = useState<Observation[]>([]);

  useEffect(() => {
    handleOrderObservations();
  }, [observations]);

  function handleOrderObservations() {
    if (observations && observations.length > 0) {
      let orderedObservations = observations.sort(
        (x: Observation, y: Observation) => {
          return y.observationDate.seconds - x.observationDate.seconds;
        }
      );

      setOrderObservations(orderedObservations);
    }
  }

  return (
    <section className="student-observations">
      <h3 className="title">Observações</h3>
      {orderObservations && orderObservations.length > 0 ? (
        orderObservations.map((key: any, index: any) => (

          <StudentObservation
            key={index}
            id={key.id}
            data={key}
            subject={key.subject}
            observation={key.observation}
            teacherName={key.teacherName}
            schoolSubject={key.schoolSubject}
          />

        ))
      ) : (
        <div className="no-observations">
          Não existem observações cadastradas para este aluno
        </div>
      )}
    </section>
  );
}
