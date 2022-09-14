import { useState } from "react";
import { FormUpdateScholl } from "./FormUpdateScholl";
import { SettingsButton } from "./SettingsButton";
import { SettingsContent } from "./SettingsContent";

export function Settings() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <div className="settings">
      <SettingsButton setIsMenuOpened={setIsMenuOpened} />

      {isMenuOpened ? (
        <SettingsContent setIsMenuOpened={setIsMenuOpened}>
          <FormUpdateScholl />
        </SettingsContent>
      ) : null}
    </div>
  );
}
