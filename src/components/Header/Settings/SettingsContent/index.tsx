import { ReactNode } from "react";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../../../../services/firebase";

type SettingsContentProps = {
  children: ReactNode;
  onClose: () => void;
};

export function SettingsContent({ onClose, children }: SettingsContentProps) {
  const navigate = useNavigate();

  async function handleCloseSettings() {
    await onClose();

    let settingsContent = document.querySelector(".settings-content");

    if (settingsContent) {
      if (settingsContent.classList.contains("open"))
        settingsContent.classList.remove("open");
    }
  }

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log("Ocorreu um erro ao sair: " + error);
      });
  }

  return (
    <div className="settings-content">
      <div className="close-mask" onClick={handleCloseSettings}></div>

      <div className="content">
        <header className="settings-header">
          <h3 className="title">Configurações de perfil</h3>
        </header>

        {children}

        <footer className="settings-footer">
          <button className="btn sign-out" onClick={handleSignOut}>
            Sair
          </button>
        </footer>
      </div>
    </div>
  );
}
