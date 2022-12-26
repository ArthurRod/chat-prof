import { useState } from "react";
import { DeleteStudentButton } from "./DeleteStudentButton";
import { DeleteStudentModal } from "./DeleteStudentModal";

import "../../../styles/delete.scss";

type DeleteStudentProps = {
  studentName: string;
  studentId: string;
};

export function DeleteStudent({ studentName, studentId }: DeleteStudentProps) {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  return (
    <div className="delete">
      <DeleteStudentButton setIsAddFormOpen={setIsAddFormOpen} />

      {isAddFormOpen ? (
        <DeleteStudentModal
          studentId={studentId}
          studentName={studentName}
          setIsModalState={setIsAddFormOpen}
        />
      ) : null}
    </div>
  );
}
