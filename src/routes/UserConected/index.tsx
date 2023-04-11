import { handleSignOut } from "../../helpers/signOut";

import "../../styles/user-conected.scss";

interface UserConectedProps {
  pathName?: string;
}

export function UserConected({ pathName }: UserConectedProps) {
  return (
    <div className="user-conected">
      <p className="text">
        Já existe um usuário conectado, deseja fazer o logout?
      </p>
      <button
        className="btn back sign-out"
        onClick={() => handleSignOut(pathName)}
      >
        Sair
      </button>
    </div>
  );
}
