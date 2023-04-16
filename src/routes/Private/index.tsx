import { useAuth } from "../../hooks/useAuth";
import { useAdminType } from "../../hooks/useAdminType";
import { InitialPage } from "../../pages/InitialPage";
import { Login } from "../../pages/Login";
import { Loading } from "../../components/Loading";

export function Private({ children }: { children: JSX.Element }) {
  const { loadingUser, user } = useAuth();
  const { loadingAdminType, adminType } = useAdminType();

  if (loadingUser || loadingAdminType) return <Loading />;

  if (!user || adminType) {
    return (
      <InitialPage>
        <Login />
      </InitialPage>
    );
  }

  return children;
}
