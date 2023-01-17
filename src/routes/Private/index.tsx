import { useAuth } from "../../hooks/useAuth";
import { useAdminType } from "../../hooks/useAdminType";
import { PaginaInicial } from "../../pages/PaginaInicial";
import { Login } from "../../pages/Login";

export function Private({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const { adminType } = useAdminType();

  if(adminType) {
    return <PaginaInicial children={<Login/>}/>
  } else if (!user) {
    return <PaginaInicial children={<Login/>}/>
  }

  return children;
}
