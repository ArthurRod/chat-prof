import { useState } from "react";
import { SettingsButton } from "./SettingsButton";
import { SettingsContent } from "./SettingsContent";
import { useAdminType } from "../../../hooks/useAdminType";
import { FormUpdateUser } from "../../Forms/FormUpdateUser";

export function Settings() {
  const { adminType } = useAdminType();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="settings">
      <SettingsButton setIsMenuOpen={setIsMenuOpen} />

      {isMenuOpen && adminType ? (
        <SettingsContent setIsMenuOpen={setIsMenuOpen}>
          <FormUpdateUser adminType={adminType.type} />
        </SettingsContent>
      ) : null}
    </div>
  );
}
