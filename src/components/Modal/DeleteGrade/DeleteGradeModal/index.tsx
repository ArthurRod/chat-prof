import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../services/firebase";

type DeleteGradeModalProps = {
  setIsModalState: (isModalState: boolean) => void;
  gradeId: string;
};

export function DeleteGradeModal({
  setIsModalState,
  gradeId
}: DeleteGradeModalProps) {

  function handleDeleteGrade() {

    deleteGrade().then(async() => {

      handleCloseSettings();

    }).catch((error) => {

      console.log(error);

    });
  }

  async function deleteGrade() {

    if (gradeId) {
      await deleteDoc(doc(db, "grades", gradeId));

      alert(`Nota removida com sucesso`);
    }

  }

  async function handleCloseSettings() {
    await setIsModalState(false);

    let modal = document.querySelector(".delete-modal.grade");

    if (modal) {
      if (modal.classList.contains("open")) modal.classList.remove("open");
    }
  }

  return (
    <div className="delete-modal grade">
      <div className="content">
        <p className="warning">Desja remover a nota?</p>
        <footer>
          <button onClick={handleDeleteGrade} className="btn delete-user">
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
