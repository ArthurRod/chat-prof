import { useAdminType } from "../../hooks/useAdminType";
import { LoginAdmin } from "../../pages/LoginAdmin";
import { PaginaInicial } from "../../pages/PaginaInicial";

export function PrivateAdmin({ children }: { children: JSX.Element }) {
  const { adminType } = useAdminType();

  if (!adminType) {
    return <PaginaInicial children={<LoginAdmin/>}/>
  }

  return children;
}
