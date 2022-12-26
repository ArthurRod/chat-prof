import { ReactNode, useEffect, useState } from "react";
import { AddButton } from "./AddButton";
import { AddDataContent } from "./AddDataContent";
import "../../styles/add-data.scss";

type AddDataProps = {
  children: ReactNode;
  modalTypeTitle: string;
};

export function AddData({ children, modalTypeTitle }: AddDataProps) {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  useEffect(() => {

    handleOpenSettings()

  },[isAddFormOpen])

  function handleOpenSettings() {
    let addDataModal = document.querySelector(".add-data-modal");

    setTimeout(() => {
      if (addDataModal) {
        addDataModal.classList.add("open");
      }
    }, 1);
  }

  return (
    <section className="add-data">

      <AddButton setIsAddFormOpen={setIsAddFormOpen} />

      {isAddFormOpen ? (
        <AddDataContent modalTypeTitle={modalTypeTitle} setIsAddDataOpen={setIsAddFormOpen}>
          {children}
        </AddDataContent>
      ) : null}

    </section>
  );
}
