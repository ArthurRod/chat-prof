import { useState } from "react";
import { useParams } from "react-router-dom";

import { Header } from "../../components/Header";
import { StudentMainEdit } from "../../components/StudentMainEdit";
import { StudentGrades } from "../../components/StudentGrades/index";
import { AddData } from "../../components/AddData/index";
import { AddGradesObservations } from "../../components/Modal/AddGradesObservations/index";
import { StudentObservations } from "../../components/StudentObservations/index";

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
                <AddData modalTypeTitle={modalTypeTitle}>
                  <AddGradesObservations
                    setModalTypeTitle={setModalTypeTitle}
                  />
                </AddData>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
