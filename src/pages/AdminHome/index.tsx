import { Plus } from "phosphor-react";

import { useAdminAuth } from "../../hooks/useAdminAuth";
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

export function AdminHome() {
  const { adminUserAuth } = useAdminAuth();
  const { adminType } = useAdminType();
  const { loadingAdminUser, adminUser } = useAdmin();

  if (loadingAdminUser) return <Loading />;

  return (
    <>
      {adminUserAuth && adminType && adminUser ? (
        <>
          <Header />
          <main className="main">
            <div className="container">
              <div className="content">
                <>
                  <AdminInfos
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
                        <CreateTeacher schoolId={adminUserAuth.uid} />
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
      ) : null}
    </>
  );
}
