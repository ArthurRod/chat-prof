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
  const { user } = useAdminAuth();
  const { loadingAdminType, adminType } = useAdminType();
  const { loadingAdminUser, adminUser } = useAdmin();

  if (loadingAdminType || loadingAdminUser) {
    return <Loading />;
  }

  if (!user || !adminType || !adminUser) {
    return;
  }

  const { uid } = user;
  const { name, phone, schoolId, schoolSubject } = adminUser;

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <div className="content">
            <>
              <AdminInfos
                adminUserName={name}
                adminUserPhone={phone}
                schoolSubject={schoolSubject}
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
                    <CreateTeacher schoolId={uid} />
                  </Modal>
                </>
              ) : (
                <>
                  <SchoolStudents schoolId={schoolId} />

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
                    <CreateStudent schoolId={schoolId!} />
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
