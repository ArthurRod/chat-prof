import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../services/firebase";

type DeleteTeacherModalProps = {
  setIsModalState: (isModalState: boolean) => void;
  teacherName: string;
  teacherId: string;
};

export function DeleteTeacherModal({
  setIsModalState,
  teacherName,
  teacherId
}: DeleteTeacherModalProps) {

  function handleDeleteTeacher() {

    deleteTeacher().then(async() => {

      handleCloseSettings();

    }).catch((error) => {

      console.log(error);

    });
  }

  async function deleteTeacher() {

    if (teacherId) {
      await deleteDoc(doc(db, "teachers", teacherId));

      await deleteDoc(doc(db, "admin-users", teacherId));

      alert(`Os dados do professor ${teacherName} foram removidos com sucesso`);
    }

  }

  async function handleCloseSettings() {
    await setIsModalState(false);

    let modal = document.querySelector(".delete-teacher-modal");

    if (modal) {
      if (modal.classList.contains("open")) modal.classList.remove("open");
    }
  }

  return (
    <div className="delete-teacher-modal">
      <div className="content">
        <p className="warning">
          Ao realizar esta ação os dados do professor {teacherName} serão
          excluídos, porém, o seu respectivo usuário permanecerá no sistema e a
          exclusão deste deverá ser feita manualmente, deseja proseguir?
        </p>
        <footer>
          <button onClick={handleDeleteTeacher} className="btn delete-user">
            Sim
          </button>
          <button onClick={handleCloseSettings} className="btn back">
            Voltar
          </button>
        </footer>
      </div>
    </div>
  );
}
