import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";

export function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, logInWithEmailAndPassword } = useAdminAuth();
  

  async function handleAdminLogin(e: FormEvent) {
    e.preventDefault();

		if (!user) {
			await logInWithEmailAndPassword(email, password)
		}

		navigate('/admin-home');
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
