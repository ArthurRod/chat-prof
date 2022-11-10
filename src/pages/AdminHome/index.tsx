import { AddData } from "../../components/AddData";
import { FormCreateStudent } from "../../components/FormCreateStudent";
import { FormCreateTeacher } from "../../components/FormCreateTeacher";
import { AdminInfos } from "../../components/AdminInfos";
import { Header } from "../../components/Header";
import { SchollTeachers } from "../../components/SchollTeachers";
import { SchollStudents } from "../../components/SchollStudents";
import { useAdmin } from "../../hooks/useAdmin";
import { useAdminType } from "../../hooks/useAdminType";
import { useAuth } from "../../hooks/useAuth";

export function AdminHome() {
  const { user } = useAuth();
  const { adminUser } = useAdmin();
  const { adminType } = useAdminType();

  if (!adminUser || !adminType || !user) {
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

              {adminType.type === "scholl" ? (
                <SchollTeachers />
              ) : (
                <SchollStudents schollId={adminUser.schollId} />
              )}

              <AddData
                modalTypeTitle={
                  adminType.type === "scholl" ? "Professor" : "Aluno"
                }
              >
                {adminType.type === "scholl" ? (
                  <FormCreateTeacher schollId={user.uid} />
                ) : (
                  <FormCreateStudent schollId={adminUser.schollId} />
                )}
              </AddData>
            </>
          </div>
        </div>
      </main>
    </>
  );
}
