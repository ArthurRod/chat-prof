import { Header } from "../../components/Header";
import { useAdmin } from "../../hooks/useAdmin";

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
            <h3>Escola: </h3><span>{adminUser.name}</span>
            <h3>Telefone: </h3><span>{adminUser.phone}</span>
          </div>
        </div>
      </main>
    </>
  );
}
