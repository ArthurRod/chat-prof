import { Header } from "../../components/Header";
import { StudentMainEdit } from "../../components/StudentMainEdit";
import { StudentGrades } from "../../components/StudentGrades/index";
import { AddData } from "../../components/AddData/index";
import { FormAddGrades } from "../../components/Forms/FormAddGrades/index";
import "../../styles/edit.scss";

export function StudentEdit() {
  return (
    <>
      <Header />
      <main className="main edit">
        <div className="container">
          <div className="content">
            <StudentMainEdit />
            <StudentGrades />
            <AddData modalTypeTitle="nota">
              <FormAddGrades />
            </AddData>
          </div>
        </div>
      </main>
    </>
  );
}
