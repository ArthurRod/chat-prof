type DeleteModalProps = {
  setIsModalState: (isModalState: boolean) => void;
  teacherName: string;
};

export function DeleteModal({setIsModalState, teacherName}: DeleteModalProps) {

  async function handleCloseSettings() {
    await setIsModalState(false);

    let modal = document.querySelector(".delete-teacher-modal");

    if (modal) {
      if (modal.classList.contains("open")) modal.classList.remove("open");
    }
  }

  return (
    <div className="delete-teacher-modal">
      <div className="content">
        <p className="warning">
          Ao realizar esta ação os dados do professor {teacherName} serão excluídos, porém, o
          seu respectivo usuário permanecerá no sistema e a exclusão deste deverá ser feita
          manualmente, deseja proseguir?
        </p>
        <footer>
          <button className="btn delete-user">Sim</button>
          <button onClick={handleCloseSettings} className="btn back">Voltar</button>
        </footer>
      </div>
    </div>
  );
}
