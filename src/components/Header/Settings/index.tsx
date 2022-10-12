import { useState } from "react";
import { SettingsButton } from "./SettingsButton";
import { SettingsContent } from "./SettingsContent";
import { useAdmin } from "../../../hooks/useAdmin";
import { FormUpdateScholl } from "../FormUpdateScholl";

export function Settings() {
  const { admin } = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="settings">

      <SettingsButton setIsMenuOpen={setIsMenuOpen} />

      {isMenuOpen && admin ? (

        <SettingsContent setIsMenuOpen={setIsMenuOpen}>

          {admin.type === "scholl" ? <FormUpdateScholl /> : null}
          
        </SettingsContent>

      ) : null}

    </div>
  );
}
