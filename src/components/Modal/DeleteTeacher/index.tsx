import { useState } from "react";
import { DeleteButton } from "./DeleteButton";
import { DeleteModal } from "./DeleteModal";

type DeleteTeacherProps = {
    teacherName: string
}

export function DeleteTeacher({teacherName}: DeleteTeacherProps) {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  return (
    <div className="delete-teacher">

      <DeleteButton setIsAddFormOpen={setIsAddFormOpen} />

      {isAddFormOpen ? (
        <DeleteModal teacherName={teacherName} setIsModalState={setIsAddFormOpen} />
      ) : null}

    </div>
  );
}
