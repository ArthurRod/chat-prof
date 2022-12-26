import { Trash } from "phosphor-react";

type DeleteObservationButtonProps = {
  setIsAddFormOpen: (isAddFormOpen: boolean) => void;
};

export function DeleteObservationButton({ setIsAddFormOpen }: DeleteObservationButtonProps) {
  async function handleOpenSettings() {
    await setIsAddFormOpen(true);

    let deleteObservationModal = document.querySelector(".delete-modal.observation");

    setTimeout(() => {
      if (deleteObservationModal) {
        deleteObservationModal.classList.add("open");
      }
    }, 1);
  }

  return (
    <button
      className="delete-button"
      onClick={() => {
        handleOpenSettings();
      }}
    >
      <Trash className="delete-button-icon" size={32} color="#ff4040" />
    </button>
  );
}
