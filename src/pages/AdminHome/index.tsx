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
import { Modal } from "../../components/Modal";

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
                <>
                  <SchoolTeachers />

                  <Modal title="Adicionar professor">
                    <FormCreateTeacher schoolId={user.uid} />
                  </Modal>
                </>
              ) : (
                <>
                  <SchoolStudents schoolId={adminUser.schoolId} />

                  <Modal title="Adicionar aluno">
                    <FormCreateStudent schoolId={adminUser.schoolId!} />
                  </Modal>
                </>
              )}
            </>
          </div>
        </div>
      </main>
    </>
  );
}
