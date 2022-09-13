import { FormEvent, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../services/firebase";
import { useScholl } from "../../../../hooks/useScholl";
import { useAuth } from "../../../../hooks/useAuth";

export function FormUpdateScholl() {
  const { user } = useAuth();
  const { scholl, setScholl } = useScholl();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function handleUpdateScholl(e: FormEvent) {
    e.preventDefault();

    if (user) {
      if (name.length > 0 || phone.length > 0) {
        updateTableScholl(user.uid);

        setScholl({
          name: name,
          phone: phone,
        });

        alert("Usuário alterado com sucesso!");
      } else {
        alert("Preencha pelo menos um dos campos!");
      }
    }
  }

  async function updateTableScholl(uid: string) {
    if (scholl) {
      await updateDoc(doc(db, "escolas", uid), {
        name: name.length > 0 ? name : scholl.name,
        phone: phone.length > 0 ? phone : scholl.phone,
      });
    }
  }

  return (
    <main className="settings-main">
      <h4 className="main-title">Alterar os dados da escola</h4>
      <form onSubmit={handleUpdateScholl}>
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Digite um novo nome"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
        <label htmlFor="telefone">Telefone</label>
        <input
          type="text"
          id="telefone"
          name="telefone"
          placeholder="Digite um novo telefone"
          onChange={(event) => setPhone(event.target.value)}
          value={phone}
        />

        <button type="submit" className="btn alterate-user">
          Alterar
        </button>
      </form>
    </main>
  );
}
