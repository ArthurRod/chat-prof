import { doc, deleteDoc } from "firebase/firestore";
import { useSchollTeachers } from "../../../../hooks/useSchollTeachers";
import { db } from "../../../../services/firebase";
import { AdminUserTeacher } from "../../../../types/AdminUserTeacher";

type DeleteModalProps = {
  setIsModalState: (isModalState: boolean) => void;
  teacherName: string;
  teacherId: string;
  setSchollTeachers: (teachersArray: AdminUserTeacher[]) => void
};

export function DeleteModal({
  setIsModalState,
  teacherName,
  teacherId,
  setSchollTeachers
}: DeleteModalProps) {
  const { schollTeachers } = useSchollTeachers();

  function handleDeleteTeacher() {

    /** 
     * TODO Tentar refazer o array de professores e retorna-lo para o parent 
     * fazendo ele ser renderizado novamente
    **/

    deleteTeacher().then(async() => {

      handleCloseSettings();

      setSchollTeachers(schollTeachers);

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
