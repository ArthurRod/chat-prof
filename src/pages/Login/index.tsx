import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../services/firebase";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth(app);

  const loginEmailESenha = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if(errorCode === "auth/user-not-found") {
          console.log("Usuário não encontrado")
        } else {
          console.log("Erro")
        }
        
      });
  };

  return (
    <div>
      <p>Login</p>

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          name="email"
          required
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          required
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={email.length === 0 || password.length === 0}
          onClick={() => loginEmailESenha()}
        >
          Logar
        </button>
      </form>
    </div>
  );
}
