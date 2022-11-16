import { useState } from "react";
import { DeleteTeacherButton } from "./DeleteTeacherButton";
import { DeleteTeacherModal } from "./DeleteTeacherModal";

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
    <div className="delete">
      <DeleteTeacherButton setIsAddFormOpen={setIsAddFormOpen} />

      {isAddFormOpen ? (
        <DeleteTeacherModal
          teacherId={teacherId}
          teacherName={teacherName}
          setIsModalState={setIsAddFormOpen}
        />
      ) : null}
    </div>
  );
}
