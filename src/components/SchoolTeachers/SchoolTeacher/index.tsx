import { useState } from "react";
import { db, doc, deleteDoc } from "../../../services/firebase";
import { Link } from "react-router-dom";
import { Trash } from "phosphor-react";

import { Alert } from "../../Alert";

interface SchoolTeacherProps {
  teacherId: string | undefined;
  teacherName: string;
  teacherEmail: string;
  teacherPhone: string;
}

export function SchoolTeacher({
  teacherId,
  teacherName,
  teacherEmail,
  teacherPhone,
}: SchoolTeacherProps) {
  const [alertMessage, setAlertMessage] = useState("");

  async function deleteTeacher() {
    if (teacherId) {
      await deleteDoc(doc(db, "teachers", teacherId)).catch((error) =>
        console.log(error)
      );
      await deleteDoc(doc(db, "admin-users", teacherId)).catch((error) =>
        console.log(error)
      );

      setAlertMessage(
        `Os dados do professor ${teacherName} foram removidos com sucesso`
      );

      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    }
  }

  return (
    <>
      <tr aria-label="Linha do corpo da tabela">
        <td>
          <Link
            className="row-link"
            target="_self"
            to={`/edit/teacher/${teacherId}`}
          >
            <span className="name" aria-label="Nome do professor">
              {teacherName}
            </span>
            <span className="email" aria-label="E-mail do professor">
              {teacherEmail}
            </span>
            <span className="phone" aria-label="Telefone do professor">
              {teacherPhone}
            </span>
          </Link>
        </td>
        <td className="delete">
          <Alert
            title="Confirmar exclusão"
            description={`Ao realizar esta ação os dados do professor ${teacherName} serão
        excluídos, porém, o seu respectivo usuário permanecerá no sistema e a
        exclusão deste deverá ser feita manualmente, deseja proseguir?`}
            triggerName="delete-button"
            trigger={
              <Trash className="delete-button-icon" size={32} color="#ff4040" />
            }
            action={deleteTeacher}
          />
        </td>
      </tr>

      {alertMessage && (
        <Alert title="Aviso" description={alertMessage} defaultOpen={true} />
      )}
    </>
  );
}
