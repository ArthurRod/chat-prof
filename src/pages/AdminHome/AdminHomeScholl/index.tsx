import { AddData } from "../../../components/AddData";
import { FormCreateTeacher } from "../../../components/AddData/FormCreateTeacher";
import { AdminInfos } from "../../../components/AdminInfos";
import { Header } from "../../../components/Header";
import { SchollTeachers } from "../../../components/SchollTeachers";
import { useScholl } from "../../../hooks/useScholl";

export function AdminHomeScholl() {
  const { scholl } = useScholl();

  if (!scholl) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <div className="content">
            <>
              <AdminInfos
                adminUserName={scholl.name}
                adminUserPhone={scholl.phone}
              />
              <SchollTeachers />

              <AddData modalTypeTitle={"Professor"}>
                <FormCreateTeacher />
              </AddData>

            </>
          </div>
        </div>
      </main>
    </>
  );
}
