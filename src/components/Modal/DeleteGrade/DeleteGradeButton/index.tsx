import { Trash } from "phosphor-react";

type DeleteGradeButtonProps = {
  setIsAddFormOpen: (isAddFormOpen: boolean) => void;
};

export function DeleteGradeButton({ setIsAddFormOpen }: DeleteGradeButtonProps) {
  async function handleOpenSettings() {
    await setIsAddFormOpen(true);

    let deleteGradeModal = document.querySelector(".delete-modal.grade");

    setTimeout(() => {
      if (deleteGradeModal) {
        deleteGradeModal.classList.add("open");
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
