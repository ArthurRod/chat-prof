import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../hooks/useAdmin";
import { useAuth } from "../../hooks/useAuth";

export function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { adminUser } = useAdmin();

  const { user, logInWithEmailAndPassword } = useAuth();



  async function handleAdminLogin(e: FormEvent) {
    e.preventDefault();

    if (!user) {
      logInWithEmailAndPassword(email, password);

      redirectAdminUser();
    }
  }

  async function redirectAdminUser() {

    if (adminUser) {
      if (adminUser.type === 'scholl') {
        navigate("/admin-home/scholl");
      } else {
        console.log(adminUser.type)
        navigate("/admin-home/teacher");
      }
    }

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
