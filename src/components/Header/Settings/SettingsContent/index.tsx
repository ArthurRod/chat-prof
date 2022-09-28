import { ReactNode } from "react";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../../../../services/firebase";
import { CloseMask } from "../../../CloseMask";

type SettingsContentProps = {
  children: ReactNode;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
};

export function SettingsContent({
  setIsMenuOpen,
  children,
}: SettingsContentProps) {
  const navigate = useNavigate();

  function handleSignOut() {
    signOut(auth)
      .then(() => {

        sessionStorage.setItem('email', "");
        sessionStorage.setItem('pass', "");

        navigate("/");
      })
      .catch((error) => {
        console.log("Ocorreu um erro ao sair: " + error);
      });
  }

  return (
    <div className="settings-modal">
      <CloseMask target={".settings-modal"} setIsModalState={setIsMenuOpen} />

      <div className="content">
        <header className="header">
          <h3 className="title">Configurações de perfil</h3>
        </header>

        {children}

        <footer className="footer">
          <button className="btn sign-out" onClick={handleSignOut}>
            Sair
          </button>
        </footer>
      </div>
    </div>
  );
}
