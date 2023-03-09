import { ReactNode } from "react";

import { handleSignOut } from "../../../../helpers/signOut";

type SettingsContentProps = {
  children: ReactNode;
};

export function SettingsContent({ children }: SettingsContentProps) {
  return (
    <div className="settings-modal">
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
