import { useState } from "react";
import { SettingsButton } from "./SettingsButton";
import { SettingsContent } from "./SettingsContent";
import { useAdminType } from "../../../hooks/useAdminType";
import { FormUpdateScholl } from "../FormUpdateScholl";

export function Settings() {
  const { adminType } = useAdminType();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="settings">

      <SettingsButton setIsMenuOpen={setIsMenuOpen} />

      {isMenuOpen && adminType ? (

        <SettingsContent setIsMenuOpen={setIsMenuOpen}>

          {adminType.type === "scholl" ? <FormUpdateScholl /> : null}
          
        </SettingsContent>

      ) : null}

    </div>
  );
}
