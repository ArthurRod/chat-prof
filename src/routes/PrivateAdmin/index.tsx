import { useAdminType } from "../../hooks/useAdminType";
import { LoginAdmin } from "../../pages/LoginAdmin";

export function PrivateAdmin({ children }: { children: JSX.Element }) {
  const { adminType } = useAdminType();

  if (!adminType) {
    return <LoginAdmin />
  }

  return children;
}
