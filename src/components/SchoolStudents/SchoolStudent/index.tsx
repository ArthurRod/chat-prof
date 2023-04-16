import { useState } from "react";
import { db, doc, deleteDoc } from "../../../services/firebase";
import { Link } from "react-router-dom";
import { Trash } from "phosphor-react";

import { useGrades } from "../../../hooks/useGrades";
import { useObservations } from "../../../hooks/useObservations";
import { Grade } from "../../../types/Grade";
import { Observation } from "../../../types/Observation";
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
  const [alertMessage, setAlertMessage] = useState("");

  async function deleteStudent() {
    if (studentId) {
      await deleteDoc(doc(db, "students", studentId));

      deleteStudentGrades(studentId);
      deleteStudentObservations(studentId);

      setAlertMessage(
        `Os dados do aluno ${studentName} foram removidos com sucesso`
      );

      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
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
    <>
      <tr aria-label="Linha do corpo da tabela">
        <td>
          <Link
            className="row-link"
            target="_self"
            to={`/edit/student/${studentId}`}
          >
            <span className="name" aria-label="Nome do estudante">
              {studentName}
            </span>
            <span
              className="fathers-phone"
              aria-label="Telefone dos pais do estudante"
            >
              {studentFathersPhone}
            </span>
          </Link>
        </td>
        <td className="delete">
          <Alert
            title="Confirmar exclusão"
            description={`Ao realizar esta ação os dados do aluno ${studentName} serão excluídos, deseja proseguir?`}
            triggerName="delete-button"
            trigger={
              <Trash className="delete-button-icon" size={32} color="#ff4040" />
            }
            action={deleteStudent}
          />
        </td>
      </tr>

      {alertMessage && (
        <Alert title="Aviso" description={alertMessage} defaultOpen={true} />
      )}
    </>
  );
}
