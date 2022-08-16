import { useAdmin } from "../../hooks/useAdmin";
import { LoginAdmin } from "../../pages/LoginAdmin";

export function PrivateAdmin({ children }: { children: JSX.Element }) {
  const { adminUser } = useAdmin();

  if (!adminUser) {
    return <LoginAdmin />
  }

  return children;
}
