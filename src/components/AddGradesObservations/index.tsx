import { FormAddGrades } from "../../components/Forms/FormAddGrades/index";
import { useState } from "react";

interface AddGradesObservationsProps {
    setModalTypeTitle: (modalTypeTitle: string) => void;
}

export function AddGradesObservations({setModalTypeTitle}: AddGradesObservationsProps) {
  const [itemSelected, setItemSelected] = useState("grade");

  function changeStates(item: string, modalTitle: string) {
    setItemSelected(item)
    setModalTypeTitle(modalTitle)
  }

  return (
    <section className="add-grades-observations">
      <nav>
        <ul>
          <li>
            <a
              onClick={() => changeStates("grade", "nota")}
              className={`menu-item ${itemSelected === "grade" ? "active" : ""}`}
              href="#add-grade"
            >
              Adicionar nota
            </a>
          </li>
          <li>
            <a
              onClick={() => changeStates("observation", "observação")}
              className={`menu-item ${itemSelected === "observation" ? "active" : ""}`}
              href="#add-observation"
            >
              Adicionar observação
            </a>
          </li>
        </ul>
      </nav>
      <div className="content">
        {itemSelected === "grade" ? <FormAddGrades /> : ""}
      </div>
    </section>
  );
}
