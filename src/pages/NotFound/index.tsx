import { Loading } from "../../components/Loading";
import { Logo } from "../../components/Logo";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import { useAdminType } from "../../hooks/useAdminType";

import "../../styles/not-found.scss";

export function NotFound() {
  const { loadingUser, adminUserAuth } = useAdminAuth();
  const { loadingAdminType, adminType } = useAdminType();

  if (loadingUser || loadingAdminType) return <Loading />;

  return (
    <section className="not-found-page">
      <div className="container">
        <div className="content">
          <Logo />
          <div className="text">
            <h3>404</h3>
            <p>Página não encontrada!</p>
          </div>
          <a
            className="link-to-home"
            href={`${adminType ? "/admin-home" : "/home"}`}
          >
            Voltar para a página inicial
          </a>
        </div>
      </div>
    </section>
  );
}
