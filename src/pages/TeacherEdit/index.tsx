import { Header } from "../../components/Header";
import { TeacherMainEdit } from "../../components/TeacherMainEdit";
import "../../styles/edit.scss";

export function TeacherEdit() {
  return (
    <>
      <Header />
      <main className="main edit">
        <div className="container">
          <div className="content">
            <TeacherMainEdit />
          </div>
        </div>
      </main>
    </>
  );
}
