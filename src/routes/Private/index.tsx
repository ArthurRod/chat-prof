import { useAuth } from "../../hooks/useAuth";
import { useAdminType } from "../../hooks/useAdminType";
import { PaginaInicial } from "../../pages/PaginaInicial";

export function Private({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const { adminType } = useAdminType();

  if(adminType) {
    return <PaginaInicial />
  } else if (!user) {
    return <PaginaInicial />
  }

  return children;
}
