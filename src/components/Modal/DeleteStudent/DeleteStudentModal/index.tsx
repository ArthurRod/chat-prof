import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../services/firebase";

type DeleteStudentModalProps = {
  setIsModalState: (isModalState: boolean) => void;
  studentName: string;
  studentId: string;
};

export function DeleteStudentModal({
  setIsModalState,
  studentName,
  studentId
}: DeleteStudentModalProps) {

  function handleDeleteStudent() {

    deleteStudent().then(async() => {

      handleCloseSettings();

    }).catch((error) => {

      console.log(error);

    });
  }

  async function deleteStudent() {

    if (studentId) {
      await deleteDoc(doc(db, "students", studentId));

      alert(`Os dados do aluno ${studentName} foram removidos com sucesso`);
    }

  }

  async function handleCloseSettings() {
    await setIsModalState(false);

    let modal = document.querySelector(".delete-students-modal");

    if (modal) {
      if (modal.classList.contains("open")) modal.classList.remove("open");
    }
  }

  return (
    <div className="delete-student-modal">
      <div className="content">
        <p className="warning">
          Ao realizar esta ação os dados do aluno {studentName} serão
          excluídos, deseja proseguir?
        </p>
        <footer>
          <button onClick={handleDeleteStudent} className="btn delete-user">
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
