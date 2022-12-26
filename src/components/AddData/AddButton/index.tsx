import { Plus } from "phosphor-react";

type AddButtonProps = {
  setIsAddFormOpen: (isAddFormOpen: boolean) => void;
};

export function AddButton({ setIsAddFormOpen }: AddButtonProps) {

  return (
    <button
      className="add-button"
      onClick={() => {
        setIsAddFormOpen(true);
      }}
    >
      <Plus className="add-button-icon" size={32} color="#ffffff" />
    </button>
  );
}
