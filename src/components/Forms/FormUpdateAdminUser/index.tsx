import { FormEvent, useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../services/firebase";

import { useAdmin } from "../../../hooks/useAdmin";
import { useAuth } from "../../../hooks/useAuth";

type FormUpdateAdminUserProps = {
  adminType: string;
};

export function FormUpdateAdminUser({ adminType }: FormUpdateAdminUserProps) {
  const { user } = useAuth();
  const { adminUser } = useAdmin();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (adminUser) {
      setName(adminUser.name);
      setPhone(adminUser.phone);
    }
  }, [adminUser]);

  function handleUpdateAdminUser(e: FormEvent) {
    e.preventDefault();

    if (user) {
      if (name.length !== 0 && phone.length !== 0) {
        updateAdminUserTable(user.uid);
        alert("Usuário alterado com sucesso!");
      } else {
        alert("Preencha os campos!");
      }
    }
  }

  async function updateAdminUserTable(uid: string) {
    if (adminUser && adminType) {
      if (adminType === "school") {
        await setDoc(
          doc(db, "schools", uid),
          {
            name: name,
            phone: phone,
          },
          { merge: true }
        );
      } else if (adminType === "teacher") {
        await setDoc(
          doc(db, "teachers", uid),
          {
            name: name,
            phone: phone,
          },
          { merge: true }
        );
      }
    }
  }

  return (
    <main className="main">
      <h4 className="title">Alterar os seus dados</h4>
      <form onSubmit={handleUpdateAdminUser}>
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
          placeholder="Digite um novo telefone"
          onChange={(event) => setPhone(event.target.value)}
          value={phone}
          required
        />

        <button type="submit" className="btn alterate-user">
          Alterar
        </button>
      </form>
    </main>
  );
}
