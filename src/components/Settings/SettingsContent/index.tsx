import { ReactNode } from "react";

import { handleSignOut } from "../../../helpers/signOut";

type SettingsContentProps = {
  children: ReactNode;
};

export function SettingsContent({ children }: SettingsContentProps) {
  return (
    <>
      {children}

      <div className="bottom">
        <button className="btn back sign-out" onClick={() => handleSignOut()}>
          Sair
        </button>
      </div>
    </>
  );
}
