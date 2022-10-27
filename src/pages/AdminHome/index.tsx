import { AddData } from "../../components/AddData";
import { FormCreateTeacher } from "../../components/AddData/FormCreateTeacher";
import { AdminInfos } from "../../components/AdminInfos";
import { Header } from "../../components/Header";
import { SchollTeachers } from "../../components/SchollTeachers";
import { useAdmin } from "../../hooks/useAdmin";
import { useAdminType } from "../../hooks/useAdminType";

export function AdminHome() {
  const { adminUser } = useAdmin();
  const { adminType } = useAdminType();

  if (!adminUser || !adminType) {
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
                adminUserType={adminType.type}
                adminUserName={adminUser.name}
                adminUserPhone={adminUser.phone}
              />

              {adminType.type === "scholl" ? <SchollTeachers /> : <h1>i'am a teacher</h1>}

              <AddData modalTypeTitle={adminType.type === "scholl" ? "Professor" : "Aluno"}>

                {adminType.type === "scholl" ? <FormCreateTeacher schollId={adminUser.schollId} /> : <h1>i'am a teacher</h1>}
                
              </AddData>
            </>
          </div>
        </div>
      </main>
    </>
  );
}
