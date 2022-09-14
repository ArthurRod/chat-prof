import "../../styles/close-mask.scss";

type CloseMaskProps = {
  target: string;
  setIsModalState: (isModalState: boolean) => void;
};

export function CloseMask({ target, setIsModalState }: CloseMaskProps) {
  
  async function handleCloseSettings() {
    await setIsModalState(false);

    let modal = document.querySelector(`${target}`);

    if (modal) {
      if (modal.classList.contains("open")) modal.classList.remove("open");
    }
  }

  return <div className="close-mask" onClick={handleCloseSettings}></div>;
}
