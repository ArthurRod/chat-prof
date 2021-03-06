import React, { FormEvent, useState } from "react";
import { auth, db } from "../../services/firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export function CadastroEscola() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateTableScholl = async (uid: string) => {
    await setDoc(doc(db, "escolas", uid), {
      type: "scholl",
      email: email,
      name: name,
      phone: phone,
    });
  };

  const createScholl = (e: FormEvent) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        const uid = data.user.uid;

        handleCreateTableScholl(uid);

        alert("Escola cadastrada!");

        console.log(data.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
      });
  };

  return (
    <>
      <p>Cadastro Escola</p>
      <form onSubmit={createScholl}>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Digite o nome da escola"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
        <input
          type="text"
          id="telefone"
          name="telefone"
          placeholder="Digite o telefone da escola"
          onChange={(event) => setPhone(event.target.value)}
          value={phone}
        />
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

        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
}
