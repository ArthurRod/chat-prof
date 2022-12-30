import { useAuth } from "../../hooks/useAuth";
import { useAdminType } from "../../hooks/useAdminType";
import { Login } from "../../pages/Login";

export function Private({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const { adminType } = useAdminType();

  if(adminType) {
    return <Login />
  } else if (!user) {
    return <Login />
  }

  return children;
}
