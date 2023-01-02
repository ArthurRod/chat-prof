import { FormEvent, useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../services/firebase";

import { useAuth } from "../../../hooks/useAuth";

export function FormUpdateUser() {
  const { user } = useAuth();
  const [name, setName] = useState("");

  useEffect(() => {
    if (user) {
      if (user.name) {
        setName(user.name);
      }
    }
  }, [user]);

  function handleUpdateUser(e: FormEvent) {
    e.preventDefault();

    if (user) {
      if (name.length !== 0) {
        if (auth && auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: name,
          })
            .then(() => {
              alert("Nome alterado com sucesso!");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        alert("Preencha o campo!");
      }
    }
  }

  return (
    <main className="main">
      <h4 className="title">Alterar os seus dados</h4>
      <form onSubmit={handleUpdateUser}>
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Digite um novo nome"
          onChange={(event) => setName(event.target.value)}
          value={name}
          required
        />

        <button type="submit" className="btn alterate-user">
          Alterar
        </button>
      </form>
    </main>
  );
}
