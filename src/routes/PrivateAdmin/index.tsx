import { Loading } from "../../components/Loading";
import { useAdminType } from "../../hooks/useAdminType";
import { LoginAdmin } from "../../pages/LoginAdmin";
import { InitialPage } from "../../pages/InitialPage";

export function PrivateAdmin({ children }: { children: JSX.Element }) {
  const { loadingAdminType, adminType } = useAdminType();

  if (loadingAdminType) {
    return <Loading />;
  } else if (!adminType) {
    return <InitialPage children={<LoginAdmin />} />;
  }

  return children;
}
