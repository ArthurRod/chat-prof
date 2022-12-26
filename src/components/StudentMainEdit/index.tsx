import { doc, getDoc, setDoc } from "@firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../services/firebase";

import { assignData, isEmptyInputs } from "../../helpers/formUpdateFunctions";

export function StudentMainEdit() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [fathersPhone, setFathersPhone] = useState("");

  useEffect(() => {
    getStudentData();
  }, []);

  const getStudentData = async () => {
    if (id) {
      const docRef = doc(db, "students", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        setName(userData.name);
        setFathersPhone(userData.fathersPhone);
      } else {
        console.log("Não foi possível encontrar os dados do aluno");
      }
    }
  };

  const updateStudent = async (e: FormEvent) => {
    e.preventDefault();

    let isEmpty = isEmptyInputs();
    let sucesso = document.querySelector("form .sucesso") as HTMLElement;

    if (!isEmpty) {
      if (id) {
        await setDoc(
          doc(db, "students", id),
          {
            name: name,
            fathersPhone: fathersPhone,
          },
          { merge: true }
        );

        sucesso.style.display = "flex";

        setTimeout(() => {
          sucesso.style.display = "none";
        }, 2000);
      }
    }
  };

  return (
    <section className="main-edit">
      <div className="student-data">
        <h3 className="title">Editar aluno</h3>
        <form onSubmit={updateStudent}>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Digite um novo nome"
            onChange={(event) => assignData(event, setName)}
            value={name}
            required
          />
          <input
            type="text"
            id="telefone"
            name="telefone"
            placeholder="Digite um novo telefone"
            onChange={(event) => assignData(event, setFathersPhone)}
            value={fathersPhone}
            required
          />

          <span className="erro" style={{ display: "none" }}>
            Preencha corretamente os dados
          </span>

          <span className="sucesso" style={{ display: "none" }}>
            Os dados do aluno foram alterados com sucesso
          </span>

          <footer>
            <button type="submit" className="btn">
              Alterar
            </button>
            <a href="/admin-home" className="btn back">
              Voltar
            </a>
          </footer>
        </form>
      </div>
    </section>
  );
}
