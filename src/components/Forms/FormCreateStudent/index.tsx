import { FormEvent, useState } from "react";
import { db } from "../../../services/firebase";
import { doc, setDoc } from "firebase/firestore";

import { clearInputs } from "../../../helpers/formUpdateFunctions";

type FormCreateStudentProps = {
  schoolId: string | undefined;
};

export function FormCreateStudent({ schoolId }: FormCreateStudentProps) {
  const [name, setName] = useState("");
  const [fathersPhone, setFathersPhone] = useState("");

  const createStudent = (e: FormEvent) => {
    e.preventDefault();

    if (schoolId) {
      createDocStudent(schoolId)
        .then(() => {
          alert("Aluno cadastrado com sucesso!");

          clearInputs();
          setName("");
          setFathersPhone("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const createDocStudent = async (schoolId: string) => {
    let id = Math.floor(Date.now() * Math.random()).toString(36);

    await setDoc(doc(db, "students", id), {
      id: id,
      name: name,
      fathersPhone: fathersPhone,
      schoolId: schoolId,
    });
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
          required
        />
        <input
          type="text"
          id="telefone-pai"
          name="telefone-pai"
          placeholder="Digite o telefone do pai ou responsável"
          onChange={(event) => setFathersPhone(event.target.value)}
          value={fathersPhone}
          required
        />

        <button
          disabled={name.length === 0 || fathersPhone.length === 0}
          type="submit"
          className="btn"
        >
          Cadastrar
        </button>
      </form>
    </main>
  );
}
