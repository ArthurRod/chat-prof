export function SettingsContent() {

    function handleCloseSettings() {
        let settingsContent = document.querySelector(".settings-content");

        if (settingsContent) {
            if (settingsContent.classList.contains("open"))
                settingsContent.classList.remove("open")
        }
    }

    return (
        <div className="settings-content">
            <div className="close-mask" onClick={() => { handleCloseSettings() }}></div>
            <div className="content">

            </div>
        </div>
    )
}