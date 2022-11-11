import { Trash } from "phosphor-react";

type DeleteTeacherButtonProps = {
  setIsAddFormOpen: (isAddFormOpen: boolean) => void;
};

export function DeleteTeacherButton({ setIsAddFormOpen }: DeleteTeacherButtonProps) {
  async function handleOpenSettings() {
    await setIsAddFormOpen(true);

    let deleteTeacherModal = document.querySelector(".delete-teacher-modal");

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
