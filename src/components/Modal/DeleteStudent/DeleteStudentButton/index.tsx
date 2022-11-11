import { Trash } from "phosphor-react";

type DeleteStudentModalProps = {
  setIsAddFormOpen: (isAddFormOpen: boolean) => void;
};

export function DeleteStudentButton({ setIsAddFormOpen }: DeleteStudentModalProps) {
  async function handleOpenSettings() {
    await setIsAddFormOpen(true);

    let deleteStudentModal = document.querySelector(".delete-student-modal");

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
