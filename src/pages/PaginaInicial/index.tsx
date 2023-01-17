import { Outlet } from "react-router-dom";
import { Logo } from "../../components/Logo";

import "../../styles/initial-page.scss";

export function PaginaInicial({children}: {children?: JSX.Element}) {
  return (
    <div className="initial-page">
      <aside>
        <div className="content">
          <Logo />
          <strong>Seja bem vindo ao chat prof! </strong>
          <p>
            Cadastre a escola agora mesmo e aproxime os pais dos professores
          </p>
        </div>
      </aside>
      <main>
        {children && children}
        <Outlet />
      </main>
    </div>
  );
}
