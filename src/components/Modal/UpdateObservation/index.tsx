import { CloseMask } from "../../CloseMask";
import { FormUpdateObservation } from "../../Forms/FormUpdateObservation";

import "../../../styles/update-observation.scss"

type UpdateObservationProps = {
  setIsModalState: (isModalState: boolean) => void;
  observationId: string;
};

export function UpdateObservation({
  setIsModalState,
  observationId
}: UpdateObservationProps) {

  return (
    <div className="update-modal">
      <CloseMask target={".update-modal"} setIsModalState={setIsModalState} />

      <div className="content">
        <header className="header">
          <h3 className="title">Editar Observação</h3>
        </header>

        <FormUpdateObservation />
      </div>
    </div>
  );
}
