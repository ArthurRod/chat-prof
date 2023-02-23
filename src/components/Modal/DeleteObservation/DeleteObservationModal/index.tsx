import { db, doc, deleteDoc } from "../../../../services/firebase";

type DeleteObservationModalProps = {
  setIsModalState: (isModalState: boolean) => void;
  observationId: string;
};

export function DeleteObservationModal({
  setIsModalState,
  observationId,
}: DeleteObservationModalProps) {
  function handleDeleteObservation() {
    deleteObservation()
      .then(async () => {
        handleCloseSettings();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function deleteObservation() {
    if (observationId) {
      await deleteDoc(doc(db, "observations", observationId));

      alert(`Observação removida com sucesso`);
    }
  }

  function handleCloseSettings() {
    setIsModalState(false);

    const modal = document.querySelector(".delete-modal.observation");

    if (modal) {
      if (modal.classList.contains("open")) modal.classList.remove("open");
    }
  }

  return (
    <div className="delete-modal observation">
      <div className="content">
        <p className="warning">Desja remover a observação?</p>
        <footer>
          <button onClick={handleDeleteObservation} className="btn delete-user">
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
