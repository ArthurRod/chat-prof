import { Link } from "react-router-dom";

import schoolImg from "../../../assets/png/school.png";
import teacherImg from "../../../assets/png/teacher.png";
import fatherAndSonImg from "../../../assets/png/father-and-son.png";
import "../../../styles/route-changer.scss";

export function RouteChanger() {
  return (
    <section className="route-changer">
      <h3 className="title">O que você deseja fazer?</h3>
      <nav className="nav-links">
        <Link to="register-school">
          <img
            className="image"
            src={schoolImg}
            alt="Imagem de Escola"
            width={100}
          />
          <span className="text">Cadastrar escola</span>
        </Link>
        <Link to="login-admin">
          <img
            className="image"
            src={teacherImg}
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
            src={fatherAndSonImg}
            alt="Imagem de pai e filho"
            width={100}
          />
          <span className="text">Fazer login</span>
        </Link>
      </nav>
    </section>
  );
}
