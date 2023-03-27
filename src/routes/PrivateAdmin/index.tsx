import { useAdminAuth } from "../../hooks/useAdminAuth";
import { useAdminType } from "../../hooks/useAdminType";
import { LoginAdmin } from "../../pages/LoginAdmin";
import { InitialPage } from "../../pages/InitialPage";
import { Loading } from "../../components/Loading";

export function PrivateAdmin({ children }: { children: JSX.Element }) {
  const { user } = useAdminAuth();
  const { loadingAdminType, adminType } = useAdminType();

  if (loadingAdminType) {
    return <Loading />;
  }

  if (!user || !adminType) {
    return (
      <InitialPage>
        <LoginAdmin />
      </InitialPage>
    );
  }

  return children;
}
