import { FormEvent, useState } from "react";
import { db } from "../../services/firebase";
import { doc, setDoc } from "firebase/firestore";

type FormCreateStudentProps = {
  schollId: string | undefined;
};

export function FormCreateStudent({ schollId }: FormCreateStudentProps) {
  const [name, setName] = useState("");
  const [fathersPhone, setFathersPhone] = useState("");

  const createStudent = (e: FormEvent) => {
    e.preventDefault();

    if (schollId) {
      createDocStudent(schollId)
        .then(() => {
          alert("Aluno cadastrado com sucesso!");

          clearInputs();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const createDocStudent = async (schollId: string) => {
    let id = Math.floor(Date.now() * Math.random()).toString(36)

    await setDoc(doc(db, "students", id), {
      id: id,
      name: name,
      fathersPhone: fathersPhone,
      schollId: schollId,
    });
  };

  const clearInputs = () => {
    let inputs = document.querySelectorAll("input");

    if (inputs) {
      inputs.forEach((item) => (item.value = ""));
    }

    setName("");
    setFathersPhone("");
  };

  return (
    <main className="main">
      <form onSubmit={createStudent}>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Digite o nome do aluno"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
        <input
          type="text"
          id="telefone-pai"
          name="telefone-pai"
          placeholder="Digite o telefone do pai ou responsável"
          onChange={(event) => setFathersPhone(event.target.value)}
          value={fathersPhone}
        />

        <button type="submit" className="btn">
          Cadastrar
        </button>
      </form>
    </main>
  );
}
