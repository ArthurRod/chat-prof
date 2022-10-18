import { useState } from "react";
import { AdminUserTeacher } from "../../../types/AdminUserTeacher";
import { DeleteButton } from "./DeleteButton";
import { DeleteModal } from "./DeleteModal";

type DeleteTeacherProps = {
    teacherName: string,
    teacherId: string,
    setSchollTeachers: (teachersArray: AdminUserTeacher[]) => void
}

export function DeleteTeacher({teacherName, teacherId, setSchollTeachers}: DeleteTeacherProps) {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  return (
    <div className="delete-teacher">

      <DeleteButton setIsAddFormOpen={setIsAddFormOpen} />

      {isAddFormOpen ? (
        <DeleteModal setSchollTeachers={setSchollTeachers} teacherId={teacherId} teacherName={teacherName} setIsModalState={setIsAddFormOpen} />
      ) : null}

    </div>
  );
}
