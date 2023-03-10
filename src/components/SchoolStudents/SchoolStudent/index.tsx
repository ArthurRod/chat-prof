import { db, doc, deleteDoc } from "../../../services/firebase";
import { Link } from "react-router-dom";
import { Trash } from "phosphor-react";

import { Grade } from "../../../types/Grade";
import { Observation } from "../../../types/Observation";
import { useGrades } from "../../../hooks/useGrades";
import { useObservations } from "../../../hooks/useObservations";
import { Alert } from "../../Alert";

interface SchoolStudentProps {
  studentId: string;
  studentName: string;
  studentFathersPhone: string;
}

export function SchoolStudent({
  studentId,
  studentName,
  studentFathersPhone,
}: SchoolStudentProps) {
  const { grades } = useGrades(studentId);
  const { observations } = useObservations(studentId);

  async function deleteStudent() {
    if (studentId) {
      await deleteDoc(doc(db, "students", studentId));

      deleteStudentGrades(studentId);
      deleteStudentObservations(studentId);

      alert(`Os dados do aluno ${studentName} foram removidos com sucesso`);
    }
  }

  function deleteStudentGrades(studentId: string) {
    if (studentId && grades) {
      grades.map(async (grade: Grade) => {
        if (grade.studentId === studentId) {
          await deleteDoc(doc(db, "grades", grade.id));
        }
      });
    }
  }

  function deleteStudentObservations(studentId: string) {
    if (studentId && observations) {
      observations.map(async (observation: Observation) => {
        if (observation.studentId === studentId) {
          await deleteDoc(doc(db, "observations", observation.id));
        }
      });
    }
  }

  return (
    <div className="row">
      <Link
        className="row-link"
        target="_self"
        to={`/edit/student/${studentId}`}
      >
        <span className="name">{studentName}</span>
        <span className="fathers-phone">{studentFathersPhone}</span>
      </Link>

      <Alert
        title="Confirmar exclusão"
        description={`Ao realizar esta ação os dados do aluno ${studentName} serão excluídos, deseja proseguir?`}
        triggerName="delete-button"
        trigger={
          <Trash className="delete-button-icon" size={32} color="#ff4040" />
        }
        action={deleteStudent}
      />
    </div>
  );
}
