import { useState } from "react";
import { AddGrades } from "../Forms/AddGrades";
import { AddObservations } from "../Forms/AddObservations";

import "../../styles/add-grades-observations.scss";

interface AddGradesObservationsProps {
  setModalTypeTitle: (modalTypeTitle: string) => void;
}

export function AddGradesObservations({
  setModalTypeTitle,
}: AddGradesObservationsProps) {
  const [itemSelected, setItemSelected] = useState("grade");

  function changeStates(item: string, modalTitle: string) {
    setItemSelected(item);
    setModalTypeTitle(modalTitle);
  }

  return (
    <section className="add-grades-observations">
      <nav className="menu-select-form">
        <ul>
          <li
            onClick={() => changeStates("grade", "nota")}
            className={`menu-item ${itemSelected === "grade" ? "active" : ""}`}
          >
            Adicionar nota
          </li>
          <li
            onClick={() => changeStates("observation", "observação")}
            className={`menu-item ${
              itemSelected === "observation" ? "active" : ""
            }`}
          >
            Adicionar observação
          </li>
        </ul>
      </nav>
      <div className={itemSelected === "grade" ? "grade" : "observation"}>
        {itemSelected === "grade" ? <AddGrades /> : <AddObservations />}
      </div>
    </section>
  );
}
