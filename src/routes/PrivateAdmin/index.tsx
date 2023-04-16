import { useAdminAuth } from "../../hooks/useAdminAuth";
import { useAdminType } from "../../hooks/useAdminType";
import { LoginAdmin } from "../../pages/LoginAdmin";
import { InitialPage } from "../../pages/InitialPage";
import { Loading } from "../../components/Loading";

export function PrivateAdmin({ children }: { children: JSX.Element }) {
  const { loadingUser, adminUserAuth } = useAdminAuth();
  const { loadingAdminType, adminType } = useAdminType();

  if (loadingUser || loadingAdminType) return <Loading />;

  if (!adminUserAuth || !adminType) {
    return (
      <InitialPage>
        <LoginAdmin />
      </InitialPage>
    );
  }

  return children;
}
