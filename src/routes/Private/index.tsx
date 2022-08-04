import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { LoginAdmin } from "../../pages/LoginAdmin";

export function Private({ children }: { children: JSX.Element }) {
  const auth = useContext(AuthContext);

  if (!auth.user) {
    return <LoginAdmin />;
  }

  return children;
}
