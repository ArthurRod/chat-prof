import { GearSix } from "phosphor-react";
import { useState } from "react";
import { FormUpdateScholl } from "./FormUpdateScholl";
import { SettingsContent } from "./SettingsContent";

export function Settings() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  async function handleOpenSettings() {
    await setIsMenuOpened(true);

    let settingsContent = document.querySelector(".settings-content");

    setTimeout(() => {
      if (settingsContent) {
        settingsContent.classList.add("open");
      }
    }, 100);
  }

  return (
    <div className="settings">
      <button
        className="button"
        onClick={() => {
          handleOpenSettings();
        }}
      >
        <GearSix className="button-icon" size={32} color="#ffffff" />
      </button>

      {isMenuOpened ? (
        <SettingsContent onClose={() => setIsMenuOpened(false)}>
          <FormUpdateScholl />
        </SettingsContent>
      ) : null}
    </div>
  );
}
