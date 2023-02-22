import { useAuth } from "../../hooks/useAuth";
import { useAdmin } from "../../hooks/useAdmin";
import { useAdminType } from "../../hooks/useAdminType";
import { AddData } from "../../components/AddData";
import { FormCreateStudent } from "../../components/Forms/FormCreateStudent";
import { FormCreateTeacher } from "../../components/Forms/FormCreateTeacher";
import { AdminInfos } from "../../components/AdminInfos";
import { Header } from "../../components/Header";
import { SchoolTeachers } from "../../components/SchoolTeachers";
import { SchoolStudents } from "../../components/SchoolStudents";
import { Loading } from "../../components/Loading";

export function AdminHome() {
  const { user } = useAuth();
  const { loadingAdminType, adminType } = useAdminType();
  const { loadingAdminUser, adminUser } = useAdmin();

  if (
    !user ||
    loadingAdminType ||
    !adminType ||
    loadingAdminUser ||
    !adminUser
  ) {
    return <Loading />;
  }

  const uid = user.uid;

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <div className="content">
            <>
              <AdminInfos
                adminUserType={adminType}
                adminUserName={adminUser.name}
                adminUserPhone={adminUser.phone}
                schoolSubject={adminUser.schoolSubject}
              />

              {adminType === "school" ? (
                <SchoolTeachers />
              ) : (
                <SchoolStudents schoolId={adminUser.schoolId} />
              )}

              <AddData
                modalTypeTitle={adminType === "school" ? "Professor" : "Aluno"}
              >
                {adminType === "school" ? (
                  <FormCreateTeacher schoolId={uid} />
                ) : (
                  <FormCreateStudent schoolId={adminUser.schoolId!} />
                )}
              </AddData>
            </>
          </div>
        </div>
      </main>
    </>
  );
}
