import { useState } from "react";
import { DeleteObservationButton } from "./DeleteObservationButton";
import { DeleteObservationModal } from "./DeleteObservationModal";

import "../../../styles/delete.scss";

type DeleteObservationProps = {
  observationId: string;
};

export function DeleteObservation({
  observationId
}: DeleteObservationProps) {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  return (
    <div className="delete">
      <DeleteObservationButton setIsAddFormOpen={setIsAddFormOpen} />

      {isAddFormOpen ? (
        <DeleteObservationModal
          observationId={observationId}
          setIsModalState={setIsAddFormOpen}
        />
      ) : null}
    </div>
  );
}
