import { GearSix } from "phosphor-react";

type SettingsButtonProps = {
  setIsMenuOpen: (isMenuOpen: boolean) => void;
};

export function SettingsButton({ setIsMenuOpen }: SettingsButtonProps) {
  async function handleOpenSettings() {
    await setIsMenuOpen(true);

    let settingsModal = document.querySelector(".settings-modal");

    setTimeout(() => {
      if (settingsModal) {
        settingsModal.classList.add("open");
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
