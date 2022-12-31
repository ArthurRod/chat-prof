import { FormEvent, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../services/firebase";

import { assignData, isEmptyInputs } from "../../helpers/formUpdateFunctions";

export function TeacherMainEdit() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    getTeacherData();
  }, []);

  const getTeacherData = async () => {
    if (id) {
      const docRef = doc(db, "teachers", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        setName(userData.name);
        setPhone(userData.phone);
      } else {
        console.log("Não foi possível encontrar os dados do professor");
      }
    }
  };

  const updateTeacher = async (e: FormEvent) => {
    e.preventDefault();

    const targets = document.querySelectorAll(
      ".main-edit form input"
    ) as NodeListOf<HTMLInputElement>;

    const isEmpty = isEmptyInputs(targets);
    const sucesso = document.querySelector("form .sucesso") as HTMLElement;

    if (!isEmpty) {
      if (id) {
        await setDoc(
          doc(db, "teachers", id),
          {
            name: name,
            phone: phone,
          },
          { merge: true }
        );

        sucesso.style.display = "flex";

        setTimeout(() => {
          sucesso.style.display = "none";
          navigate(-1);
        }, 2000);
      }
    }
  };

  return (
    <section className="main-edit">
      <div className="teacher-data">
        <h3 className="title">Editar professor</h3>
        <form onSubmit={updateTeacher}>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Digite um novo nome"
            onChange={(event) => assignData(event, setName)}
            value={name}
          />
          <input
            type="text"
            id="telefone"
            name="telefone"
            placeholder="Digite um novo telefone"
            onChange={(event) => assignData(event, setPhone)}
            value={phone}
          />

          <span className="erro" style={{ display: "none" }}>
            Preencha corretamente os dados
          </span>

          <span className="sucesso" style={{ display: "none" }}>
            Os dados do professor foram alterados com sucesso
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
