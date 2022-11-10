import { useState } from "react";
import { DeleteButton } from "./DeleteButton";
import { DeleteModal } from "./DeleteModal";

type DeleteTeacherProps = {
  teacherName: string;
  teacherId: string;
};

export function DeleteTeacher({
  teacherName,
  teacherId
}: DeleteTeacherProps) {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  return (
    <div className="delete-teacher">
      <DeleteButton setIsAddFormOpen={setIsAddFormOpen} />

      {isAddFormOpen ? (
        <DeleteModal
          teacherId={teacherId}
          teacherName={teacherName}
          setIsModalState={setIsAddFormOpen}
        />
      ) : null}
    </div>
  );
}
