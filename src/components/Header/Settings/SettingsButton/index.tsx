import { GearSix } from "phosphor-react";

type SettingsButtonProps = {
    setIsMenuOpened: (isMenuOpened: boolean) => void;
}

export function SettingsButton({setIsMenuOpened}: SettingsButtonProps) {

  async function handleOpenSettings() {
    await setIsMenuOpened(true);

    let settingsContent = document.querySelector(".settings-content");

    setTimeout(() => {
      if (settingsContent) {
        settingsContent.classList.add("open");
      }
    }, 1);
  }

  return (
    <button
      className="button"
      onClick={() => {
        handleOpenSettings();
      }}
    >
      <GearSix className="button-icon" size={32} color="#ffffff" />
    </button>
  );
}
