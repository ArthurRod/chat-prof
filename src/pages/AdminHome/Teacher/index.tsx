import { AdminInfos } from "../../../components/AdminInfos";
import { Header } from "../../../components/Header";
import { useTeacher } from "../../../hooks/useTeacher";

export function AdminHomeTeacher() {
  const { teacher } = useTeacher();

  if (!teacher) {
    return <span>Loading...</span>
  }

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <div className="content">
            <AdminInfos adminUserName={teacher.name} adminUserPhone={teacher.phone} />
          </div>
        </div>
      </main>
    </>
  );
}
