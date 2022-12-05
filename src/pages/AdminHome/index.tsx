import { AddData } from "../../components/AddData";
import { FormCreateStudent } from "../../components/FormCreateStudent";
import { FormCreateTeacher } from "../../components/FormCreateTeacher";
import { AdminInfos } from "../../components/AdminInfos";
import { Header } from "../../components/Header";
import { SchoolTeachers } from "../../components/SchoolTeachers";
import { SchoolStudents } from "../../components/SchoolStudents";
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

              {adminType.type === "school" ? (
                <SchoolTeachers />
              ) : (
                <SchoolStudents schoolId={adminUser.schoolId} />
              )}

              <AddData
                modalTypeTitle={
                  adminType.type === "school" ? "Professor" : "Aluno"
                }
              >
                {adminType.type === "school" ? (
                  <FormCreateTeacher schoolId={user.uid} />
                ) : (
                  <FormCreateStudent schoolId={adminUser.schoolId} />
                )}
              </AddData>
            </>
          </div>
        </div>
      </main>
    </>
  );
}
