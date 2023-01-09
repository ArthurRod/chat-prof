import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useObservations } from "../../hooks/useObservations";
import { Observation } from "../../types/Observation";
import { StudentObservation } from "./StudentObservation";
import { handleOrderObservations } from "../../helpers/handleOrderObservations";

import "../../styles/student-observations.scss";

export function StudentObservations() {
  const { id } = useParams();
  const { observations } = useObservations(id);
  const [orderObservations, setOrderObservations] = useState<Observation[]>([]);

  useEffect(() => {
    handleOrderObservations(observations, setOrderObservations);
  }, [observations]);

  return (
    <section className="student-observations">
      <h3 className="title">Observações</h3>
      {orderObservations && orderObservations.length > 0 ? (
        orderObservations.map((key: any, index: any) => (

          <StudentObservation
            key={index}
            id={key.id}
            dateSeconds={key.observationDate.seconds}
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
