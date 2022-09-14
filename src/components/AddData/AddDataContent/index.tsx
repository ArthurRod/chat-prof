import { ReactNode } from "react";
import { CloseMask } from "../../CloseMask";

type SettingsContentProps = {
  children: ReactNode;
  setIsAddDataOpen: (isAddFormOpened: boolean) => void;
  modalTypeTitle: string;
};

export function AddDataContent({
  setIsAddDataOpen,
  children,
  modalTypeTitle,
}: SettingsContentProps) {
  return (
    <div className="add-data-modal">
      
      <CloseMask target={".add-data"} setIsModalState={setIsAddDataOpen} />

      <div className="content">
        <header className="header">
          <h3 className="title">Adicionar {modalTypeTitle}</h3>
        </header>

        {children}

        <footer className="footer"></footer>
      </div>

    </div>
  );
}
