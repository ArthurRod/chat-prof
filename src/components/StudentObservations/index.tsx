import { useState, useEffect } from "react";

import { Observation } from "../../types/Observation";
import { useObservations } from "../../hooks/useObservations";
import { handleOrderObservations } from "../../helpers/handleOrderObservations";
import { StudentObservation } from "./StudentObservation";

import "../../styles/student-observations.scss";

interface StudentObservationsProps {
  id: string | undefined;
}

export function StudentObservations({ id }: StudentObservationsProps) {
  const { observations } = useObservations(id);
  const [orderObservations, setOrderObservations] = useState<Observation[]>([]);

  useEffect(() => {
    handleOrderObservations(observations, setOrderObservations);
  }, [observations]);

  return (
    <section className="student-observations">
      <h3 className="title">Observações</h3>
      {orderObservations && orderObservations.length > 0 ? (
        orderObservations.map((orderObservation: Observation, index: any) => (
          <StudentObservation
            key={index}
            id={orderObservation.id}
            dateSeconds={orderObservation.observationDate.seconds}
            subject={orderObservation.subject}
            observation={orderObservation.observation}
            teacherName={orderObservation.teacherName}
            schoolSubject={orderObservation.schoolSubject}
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
