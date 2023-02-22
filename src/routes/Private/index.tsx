import { useAuth } from "../../hooks/useAuth";
import { useAdminType } from "../../hooks/useAdminType";
import { InitialPage } from "../../pages/InitialPage";
import { Login } from "../../pages/Login";
import { Loading } from "../../components/Loading";

export function Private({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const { loadingAdminType, adminType } = useAdminType();

  if (loadingAdminType) {
    return <Loading />;
  }

  if (!user) {
    return <InitialPage children={<Login />} />;
  } else if (adminType) {
    return <InitialPage children={<Login />} />;
  }

  return children;
}
