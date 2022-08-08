import { GearSix } from "phosphor-react";
import { SettingsContent } from "./SettingsContent";
import "./styles.scss";

export function Settings() {

    function handleOpenSettings() {
        let settingsContent = document.querySelector(".settings-content");

        if (settingsContent) {
            settingsContent.classList.add("open")
        }
    }

    return (
        <div className="settings">
            <button
                className="settings-button"
                onClick={() => {
                    handleOpenSettings();
                }}
            >
                <GearSix
                    className="settings-button-icon"
                    size={32}
                    color="#ffffff"
                />
            </button>
            
            <SettingsContent />
        </div>
    )
}