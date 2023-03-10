import { db, doc, deleteDoc } from "../../../services/firebase";

import { Trash } from "phosphor-react";
import { Alert } from "../../Alert";

interface StudentGradeProps {
  isBadGrade: boolean;
  id: string;
  teacherName: string;
  schoolSubject: string;
  period: string;
  schoolGrade: string;
}

export function StudentGrade({
  isBadGrade,
  id,
  teacherName,
  schoolSubject,
  period,
  schoolGrade,
}: StudentGradeProps) {
  async function deleteGrade() {
    if (id) {
      deleteDoc(doc(db, "grades", id))
        .then(() => alert(`Nota removida com sucesso`))
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className={`grade ${isBadGrade && "bad-grade"}`}>
      <div className="teacher-name">
        <span>
          <strong>Professor: </strong>
          {teacherName}
        </span>
      </div>
      <div className="school-subject">
        <span>
          <strong>Matéria: </strong>
          {schoolSubject}
        </span>
      </div>
      <div>
        <span className="period">
          <strong>Período: </strong>
          {period}
        </span>
      </div>
      <div className="school-grade">
        <span>
          <strong>Nota: </strong>
          {schoolGrade} pts
        </span>
      </div>

      <Alert
        title="Confirmar exclusão"
        description=" Deseja remover a nota?"
        triggerName="delete-button"
        trigger={
          <Trash className="delete-button-icon" size={32} color="#ff4040" />
        }
        action={deleteGrade}
      />
    </div>
  );
}
