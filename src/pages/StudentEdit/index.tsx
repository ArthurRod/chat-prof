import { useState } from "react";
import { useParams } from "react-router-dom";

import { Header } from "../../components/Header";
import { StudentMainEdit } from "../../components/StudentMainEdit";
import { StudentGrades } from "../../components/StudentGrades";
import { AddGradesObservations } from "../../components/AddGradesObservations";
import { StudentObservations } from "../../components/StudentObservations";
import { Modal } from "../../components/Modal";
import { Plus } from "phosphor-react";

import "../../styles/edit.scss";

export function StudentEdit() {
  const { id } = useParams();
  const [modalTypeTitle, setModalTypeTitle] = useState("nota");
  const [isValidId, setIsValidId] = useState(false);

  return (
    <>
      <Header />
      <main className="main edit">
        <div className="container">
          <div className="content">
            <StudentMainEdit
              id={id}
              isValidId={isValidId}
              setIsValidId={setIsValidId}
            />

            {isValidId && (
              <>
                <StudentGrades id={id} />
                <StudentObservations id={id} />
                <Modal
                  title={`Adicionar ${modalTypeTitle}`}
                  triggerName="add-button"
                  trigger={
                    <Plus className="add-button-icon" size={32} color="#fff" />
                  }
                >
                  <AddGradesObservations
                    setModalTypeTitle={setModalTypeTitle}
                  />
                </Modal>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
