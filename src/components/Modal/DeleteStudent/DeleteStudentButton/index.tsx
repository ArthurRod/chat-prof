import { Trash } from "phosphor-react";

type DeleteStudentModalProps = {
  setIsAddFormOpen: (isAddFormOpen: boolean) => void;
};

export function DeleteStudentButton({
  setIsAddFormOpen,
}: DeleteStudentModalProps) {
  function handleOpenSettings() {
    setIsAddFormOpen(true);

    const deleteStudentModal = document.querySelector(".delete-modal.student");

    setTimeout(() => {
      if (deleteStudentModal) {
        deleteStudentModal.classList.add("open");
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
