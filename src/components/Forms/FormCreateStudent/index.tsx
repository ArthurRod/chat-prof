import { FormEvent, useState } from "react";
import InputMask from "react-input-mask";
import { db } from "../../../services/firebase";
import { doc, setDoc } from "firebase/firestore";

import { clearInputs } from "../../../helpers/formUpdateFunctions";

type FormCreateStudentProps = {
  schoolId: string;
};

export function FormCreateStudent({ schoolId }: FormCreateStudentProps) {
  const countryCode = "+55";

  const [name, setName] = useState("");
  const [fathersPhone, setFathersPhone] = useState(countryCode);

  const createStudent = (e: FormEvent) => {
    e.preventDefault();

    if (schoolId) {
      createDocStudent(schoolId)
        .then(() => {
          alert("Aluno cadastrado com sucesso!");

          clearInputs();

          setName("");
          setFathersPhone(countryCode);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const createDocStudent = async (schoolId: string) => {
    const randomId = Math.floor(Date.now() * Math.random()).toString(36);

    const data = {
      id: randomId,
      name: name,
      fathersPhone: fathersPhone,
      schoolId: schoolId,
    };

    await setDoc(doc(db, "students", randomId), data);
  };

  return (
    <main className="main">
      <form onSubmit={createStudent}>
        <label htmlFor="telefone-pai">Nome do aluno</label>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Digite o nome do aluno"
          onChange={(event) => setName(event.target.value)}
          value={name}
          required
        />
        <label htmlFor="telefone-pai">Telefone dos pais</label>
        <InputMask
          type="tel"
          id="telefone-pai"
          name="telefone-pai"
          placeholder="Digite o telefone do pai ou responsável"
          onChange={(event) => setFathersPhone(event.target.value)}
          value={fathersPhone}
          mask="+99 (99) 99999-9999"
          required
        />

        <button
          disabled={name.length === 0 || fathersPhone.length <= 3}
          type="submit"
          className="btn"
        >
          Cadastrar
        </button>
      </form>
    </main>
  );
}
