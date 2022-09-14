import { ReactNode, useState } from "react";
import { AddButton } from "./AddButton";
import { AddDataContent } from "./AddDataContent";
import "../../styles/add-data.scss";

type AddDataProps = {
  children: ReactNode;
  modalTypeTitle: string;
};

export function AddData({ children, modalTypeTitle }: AddDataProps) {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

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
