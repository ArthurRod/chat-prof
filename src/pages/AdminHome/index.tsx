import { Header } from "../../components/Header";
import { useAdmin } from "../../hooks/useAdmin";

export function AdminHome() {
  const { adminUser } = useAdmin();

  return (
    <>
      <Header />
      <div className="content">
        <span>{adminUser?.type}</span>
        <span>{adminUser?.name}</span>
        <span>{adminUser?.email}</span>
        <span>{adminUser?.phone}</span>
      </div>
    </>
  );
}
