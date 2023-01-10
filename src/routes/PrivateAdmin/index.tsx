import { useAdminType } from "../../hooks/useAdminType";
import { PaginaInicial } from "../../pages/PaginaInicial";

export function PrivateAdmin({ children }: { children: JSX.Element }) {
  const { adminType } = useAdminType();

  if (!adminType) {
    return <PaginaInicial />
  }

  return children;
}
