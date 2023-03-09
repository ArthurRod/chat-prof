import { useState } from "react";
import { SettingsButton } from "./SettingsButton";
import { SettingsContent } from "./SettingsContent";
import { useAdminType } from "../../../hooks/useAdminType";
import { UpdateAdminUser } from "../../Forms/UpdateAdminUser";
import { UpdateUser } from "../../Forms/UpdateUser";

export function Settings() {
  const { adminType } = useAdminType();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="settings">
      <SettingsButton setIsMenuOpen={setIsMenuOpen} />

      {isMenuOpen && adminType ? (
        <SettingsContent setIsMenuOpen={setIsMenuOpen}>
          <UpdateAdminUser adminType={adminType} />
        </SettingsContent>
      ) : (
        <SettingsContent setIsMenuOpen={setIsMenuOpen}>
          <UpdateUser />
        </SettingsContent>
      )}
    </div>
  );
}
