import { ReactNode } from "react";

import { handleSignOut } from "../../../../helpers/signOut";
import { CloseMask } from "../../../CloseMask";

type SettingsContentProps = {
  children: ReactNode;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
};

export function SettingsContent({
  setIsMenuOpen,
  children,
}: SettingsContentProps) {
  return (
    <div className="settings-modal">
      <CloseMask target={".settings-modal"} setIsModalState={setIsMenuOpen} />

      <div className="content">
        <header className="header">
          <h3 className="title">Configurações</h3>
        </header>

        {children}

        <footer className="footer">
          <button className="btn back sign-out" onClick={() => handleSignOut()}>
            Sair
          </button>
        </footer>
      </div>
    </div>
  );
}
