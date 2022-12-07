import { Header } from "../../components/Header";
import { StudentMainEdit } from "../../components/StudentMainEdit";
import { StudentGrades } from "../../components/StudentGrades/index";
import { AddData } from "../../components/AddData/index";
import "../../styles/edit.scss";
import { AddGradesObservations } from '../../components/AddGradesObservations/index';
import { useState } from 'react';

export function StudentEdit() {
  const [modalTypeTitle, setModalTypeTitle] = useState("nota");

  return (
    <>
      <Header />
      <main className="main edit">
        <div className="container">
          <div className="content">
            <StudentMainEdit />
            <StudentGrades />
            <AddData modalTypeTitle={modalTypeTitle}>
              <AddGradesObservations setModalTypeTitle={setModalTypeTitle} />
            </AddData>
          </div>
        </div>
      </main>
    </>
  );
}
