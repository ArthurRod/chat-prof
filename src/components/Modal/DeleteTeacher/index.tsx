import { useState } from "react";
import { DeleteButton } from "./DeleteButton";
import { DeleteModal } from "./DeleteModal";

type DeleteTeacherProps = {
  teacherName: string;
  teacherId: string;
  setIsModified: (isModified: Boolean) => void;
};

export function DeleteTeacher({
  teacherName,
  teacherId,
  setIsModified,
}: DeleteTeacherProps) {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  return (
    <div className="delete-teacher">
      <DeleteButton setIsAddFormOpen={setIsAddFormOpen} />

      {isAddFormOpen ? (
        <DeleteModal
          setIsModified={setIsModified}
          teacherId={teacherId}
          teacherName={teacherName}
          setIsModalState={setIsAddFormOpen}
        />
      ) : null}
    </div>
  );
}
