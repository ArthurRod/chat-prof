import { AdminInfos } from "../../../components/AdminInfos";
import { Header } from "../../../components/Header";
import { useAdmin } from "../../../hooks/useAdmin";

export function AdminHomeScholl() {
  const { adminUser } = useAdmin();

  if (!adminUser) {
    return <span>Loading...</span>
  }

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <div className="content">
            <AdminInfos adminUserName={adminUser.name} adminUserPhone={adminUser.phone} />
            <section className="scholl-teachers">

            </section>
          </div>
        </div>
      </main>
    </>
  );
}
