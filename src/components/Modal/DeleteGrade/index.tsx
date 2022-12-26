import { useState } from "react";
import { DeleteGradeButton } from "./DeleteGradeButton";
import { DeleteGradeModal } from "./DeleteGradeModal";

import "../../../styles/delete.scss";

type DeleteGradeProps = {
  gradeId: string;
};

export function DeleteGrade({
  gradeId
}: DeleteGradeProps) {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  return (
    <div className="delete">
      <DeleteGradeButton setIsAddFormOpen={setIsAddFormOpen} />

      {isAddFormOpen ? (
        <DeleteGradeModal
          gradeId={gradeId}
          setIsModalState={setIsAddFormOpen}
        />
      ) : null}
    </div>
  );
}
