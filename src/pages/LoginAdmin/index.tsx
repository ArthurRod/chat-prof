import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";

import { useAdminAuth } from "../../hooks/useAdminAuth";
import { useAuth } from "../../hooks/useAuth";
import { UserConected } from "../../routes/UserConected";
import { Alert } from "../../components/Alert";

export function LoginAdmin() {
  const { adminUserAuth } = useAdminAuth();
  const { user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, logInWithEmailAndPassword } = useAdminAuth();

  const navigate = useNavigate();

  function handleAdminLogin(e: FormEvent) {
    if (email.length > 0 && password.length > 0) {
      e.preventDefault();

      logInWithEmailAndPassword(email, password)
        .then(() => {
          navigate("/admin-home");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <>
      {adminUserAuth || user ? (
        <UserConected pathName="login-admin" />
      ) : (
        <section className="login-register login-admin">
          <Link className="back-button" to="/">
            <ArrowLeft size={16} />
            Voltar
          </Link>
          <h3 className="title">Login Admin</h3>
          <form onSubmit={handleAdminLogin}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite o e-mail"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              required
            />
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="on"
              placeholder="Digite a senha"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              required
            />

            <button
              disabled={email.length === 0 || password.length < 6}
              className="btn"
              type="submit"
            >
              Logar
            </button>
          </form>

          {error && (
            <Alert title="Erro" description={error} defaultOpen={true} />
          )}
        </section>
      )}
    </>
  );
}
