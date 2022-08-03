import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, logInWithEmailAndPassword } = useAuth();
  
  
  async function handleAdminLogin(e: FormEvent) {
    e.preventDefault();

    if (!user) {
      logInWithEmailAndPassword(email, password);
    }

    navigate("/admin-home");
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
