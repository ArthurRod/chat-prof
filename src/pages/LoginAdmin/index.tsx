import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logInWithEmailAndPassword } = useAuth();

  const navigate = useNavigate();

  function handleAdminLogin(e: FormEvent) {
    e.preventDefault();

    logInWithEmailAndPassword(email, password).then((data) => {

      navigate("/admin-home");

    }).catch((error) => {

      console.log(error);

    });
  }

  return (
    <>
      <p>Login Adm</p>
      <form onSubmit={handleAdminLogin}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite o e-mail"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Digite a senha"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />

        <button type="submit">Logar</button>
      </form>
    </>
  );
}
