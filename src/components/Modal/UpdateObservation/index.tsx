import { CloseMask } from "../../CloseMask";
import { FormUpdateObservation } from "../../Forms/FormUpdateObservation";

import "../../../styles/update-observation.scss"

interface UpdateObservationProps {
  setIsModalState: (isModalState: boolean) => void;
  observationId: string;
  subject: string;
  observation: string;
};

export function UpdateObservation({
  setIsModalState,
  observationId,
  subject,
  observation
}: UpdateObservationProps) {

  return (
    <div className="update-modal">
      <CloseMask target={".update-modal"} setIsModalState={setIsModalState} />

      <div className="content">
        <header className="header">
          <h3 className="title">Editar Observação</h3>
        </header>

        <FormUpdateObservation 
          setIsModalState={setIsModalState}
          observationId={observationId} 
          subject={subject}
          observation={observation}
        />
      </div>
    </div>
  );
}
