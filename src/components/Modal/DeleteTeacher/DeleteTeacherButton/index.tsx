import { Trash } from "phosphor-react";

type DeleteTeacherButtonProps = {
  setIsAddFormOpen: (isAddFormOpen: boolean) => void;
};

export function DeleteTeacherButton({
  setIsAddFormOpen,
}: DeleteTeacherButtonProps) {
  function handleOpenSettings() {
    setIsAddFormOpen(true);

    const deleteTeacherModal = document.querySelector(".delete-modal.teacher");

    setTimeout(() => {
      if (deleteTeacherModal) {
        deleteTeacherModal.classList.add("open");
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
