import { Link } from "react-router-dom";

import "../../../styles/route-changer.scss";

export function RouteChanger() {
  return (
    <section className="route-changer">
      <h3 className="title">O que você deseja fazer?</h3>
      <nav className="nav-links">
        <Link to="register-school">
          <img
            className="image"
            src="/src/assets/png/school.png"
            alt="Imagem de Escola"
            width={100}
          />
          <span className="text">Cadastrar escola</span>
        </Link>
        <Link to="login-admin">
          <img
            className="image"
            src="/src/assets/png/teacher.png"
            alt="Imagem de professor"
            width={100}
          />
          <span className="text">
            Fazer login como usuário administrativo (Escola ou Professor)
          </span>
        </Link>
        <span className="middle-text">ou</span>
        <Link to="login">
          <img
            className="image"
            src="/src/assets/png/father-and-son.png"
            alt="Imagem de pai e filho"
            width={100}
          />
          <span className="text">Fazer login</span>
        </Link>
      </nav>
    </section>
  );
}
