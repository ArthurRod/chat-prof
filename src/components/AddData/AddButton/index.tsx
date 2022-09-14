import { Plus } from "phosphor-react";

type AddButtonProps = {
  setIsAddFormOpen: (isAddFormOpen: boolean) => void;
};

export function AddButton({ setIsAddFormOpen }: AddButtonProps) {
  
  async function handleOpenSettings() {
    await setIsAddFormOpen(true);

    let addDataModal = document.querySelector(".add-data-modal");

    setTimeout(() => {
      if (addDataModal) {
        addDataModal.classList.add("open");
      }
    }, 1);
  }

  return (
    <button
      className="add-button"
      onClick={() => {
        handleOpenSettings();
      }}
    >
      <Plus className="add-button-icon" size={32} color="#ffffff" />
    </button>
  );
}
