import { useAuth } from "../../hooks/useAuth";
import { useAdmin } from "../../hooks/useAdmin";
import { useAdminType } from "../../hooks/useAdminType";
import { CreateStudent } from "../../components/Forms/CreateStudent";
import { CreateTeacher } from "../../components/Forms/CreateTeacher";
import { AdminInfos } from "../../components/AdminInfos";
import { Header } from "../../components/Header";
import { SchoolTeachers } from "../../components/SchoolTeachers";
import { SchoolStudents } from "../../components/SchoolStudents";
import { Loading } from "../../components/Loading";
import { Modal } from "../../components/Modal";
import { Plus } from "phosphor-react";

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

                  <Modal
                    title="Adicionar professor"
                    triggerName="add-button"
                    trigger={
                      <Plus
                        className="add-button-icon"
                        size={32}
                        color="#fff"
                      />
                    }
                  >
                    <CreateTeacher schoolId={user.uid} />
                  </Modal>
                </>
              ) : (
                <>
                  <SchoolStudents schoolId={adminUser.schoolId} />

                  <Modal
                    title="Adicionar aluno"
                    triggerName="add-button"
                    trigger={
                      <Plus
                        className="add-button-icon"
                        size={32}
                        color="#fff"
                      />
                    }
                  >
                    <CreateStudent schoolId={adminUser.schoolId!} />
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
