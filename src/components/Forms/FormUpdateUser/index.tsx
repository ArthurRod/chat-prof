import { FormEvent, useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../services/firebase";

import { useAuth } from "../../../hooks/useAuth";

export function FormUpdateUser() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (user) {
      if (user.name) {
        setName(user.name);
      }
      if (user.phone) {
        setPhone(user.phone);
      }
    }
  }, [user]);

  function handleUpdateUser(e: FormEvent) {
    e.preventDefault();

    if (user) {
      if (name.length !== 0 && phone.length !== 0) {
        if (auth && auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: name,
          })
            .then(() => {
              alert("Usuário alterado com sucesso!");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        alert("Preencha os campos!");
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
        <label htmlFor="telefone">Telefone</label>
        <input
          type="text"
          id="telefone"
          name="telefone"
          onChange={(event) => setPhone(event.target.value)}
          value={phone}
          disabled
          required
        />

        <button type="submit" className="btn alterate-user">
          Alterar
        </button>
      </form>
    </main>
  );
}
