import { useAdmin } from "../../hooks/useAdmin";
import { LoginAdmin } from "../../pages/LoginAdmin";

export function PrivateAdmin({ children }: { children: JSX.Element }) {
  const { admin } = useAdmin();

  if (!admin) {
    return <LoginAdmin />
  }

  return children;
}
