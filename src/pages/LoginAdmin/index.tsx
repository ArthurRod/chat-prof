import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminType } from "../../hooks/useAdminType";
import { useAuth } from "../../hooks/useAuth";

export function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, logInWithEmailAndPassword } = useAuth();
  const { getAdminType } = useAdminType();

  const navigate = useNavigate();

  function handleAdminLogin(e: FormEvent) {
    e.preventDefault();

    logInWithEmailAndPassword(email, password)
      .then(async (data) => {
        if (user) {
          let result = await getAdminType(user);

          if (result && result.type === "scholl") {
            navigate("/admin-home/scholl");
          } else if (result && result.type === "teacher") {
            navigate("/admin-home/teacher");
          } else {
            navigate("/login-admin");
          }
        }
      })
      .catch((error) => {
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
