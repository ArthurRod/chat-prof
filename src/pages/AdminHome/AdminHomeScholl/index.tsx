import { AdminInfos } from "../../../components/AdminInfos";
import { Header } from "../../../components/Header";
import { useScholl } from "../../../hooks/useScholl";
import { useSchollTeachers } from "../../../hooks/useSchollTeachers";

export function AdminHomeScholl() {
  const { scholl } = useScholl();
  const { schollTeachers } = useSchollTeachers();

  if (!scholl) {
    return <span>Loading...</span>
  }

  console.log(schollTeachers)

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <div className="content">
            <AdminInfos adminUserName={scholl.name} adminUserPhone={scholl.phone} />
            <section className="scholl-teachers">

            </section>
          </div>
        </div>
      </main>
    </>
  );
}
