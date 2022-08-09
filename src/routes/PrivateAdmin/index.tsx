import { useAdmin } from "../../hooks/useAdmin";
import { LoginAdmin } from "../../pages/LoginAdmin";

export function PrivateAdmin({ children, type }: { children: JSX.Element, type: "scholl" | "teacher" }) {
  const { adminUser } = useAdmin();

  if (adminUser?.type !== type) {
    return <LoginAdmin />;
  }

  return children;
}
