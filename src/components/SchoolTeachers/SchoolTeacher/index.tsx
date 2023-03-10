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
  async function deleteTeacher() {
    if (teacherId) {
      await deleteDoc(doc(db, "teachers", teacherId)).catch((error) =>
        console.log(error)
      );
      await deleteDoc(doc(db, "admin-users", teacherId)).catch((error) =>
        console.log(error)
      );

      alert(`Os dados do professor ${teacherName} foram removidos com sucesso`);
    }
  }

  return (
    <div className="row">
      <Link
        className="row-link"
        target="_self"
        to={`/edit/teacher/${teacherId}`}
      >
        <span className="name">{teacherName}</span>
        <span className="email">{teacherEmail}</span>
        <span className="phone">{teacherPhone}</span>
      </Link>

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
    </div>
  );
}
