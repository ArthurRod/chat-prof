import { FormEvent, useState } from "react";
import InputMask from "react-input-mask";
import { db, doc, setDoc } from "../../../services/firebase";

import { clearForm } from "../../../helpers/clearForm";
import { isStringMaxSize } from "../../../helpers/isStringMaxSize";
import { Alert } from "../../Alert";

type CreateStudentProps = {
  schoolId: string;
};

export function CreateStudent({ schoolId }: CreateStudentProps) {
  const countryCode = "+55";

  const [name, setName] = useState("");
  const [fathersPhone, setFathersPhone] = useState(countryCode);
  const [alertMessage, setAlertMessage] = useState("");

  const createStudent = (e: FormEvent) => {
    e.preventDefault();

    if (schoolId) {
      createDocStudent(schoolId)
        .then(() => {
          setAlertMessage("Aluno cadastrado com sucesso.");

          clearForm("form-create-student");
          setName("");
          setFathersPhone(countryCode);

          setTimeout(() => {
            setAlertMessage("");
          }, 3000);
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
    <>
      <form id="form-create-student" onSubmit={createStudent}>
        <label htmlFor="nome">Nome do aluno</label>
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
          placeholder="+99 (99) 99999-9999"
          onChange={(event) => setFathersPhone(event.target.value)}
          value={fathersPhone}
          mask="+9999999999999"
          required
        />

        <button
          disabled={name.length === 0 || !isStringMaxSize(fathersPhone, 13)}
          type="submit"
          className="btn"
        >
          Cadastrar
        </button>
      </form>

      {alertMessage && (
        <Alert title="Aviso" description={alertMessage} defaultOpen={true} />
      )}
    </>
  );
}
