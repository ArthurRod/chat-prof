import { FormEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { db } from "../../services/firebase";

import { assignData } from "../../helpers/formUpdateFunctions";

export function TeacherMainEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isValidId, setIsValidId] = useState(false);

  useEffect(() => {
    getTeacherData();
  }, []);

  const getTeacherData = async () => {
    if (id) {
      const docRef = doc(db, "teachers", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const { name, phone } = userData;

        setName(name);
        setPhone(phone);

        setIsValidId(true);
      }
    }
  };

  const updateTeacher = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await setDoc(
        doc(db, "teachers", id!),
        {
          name: name,
          phone: phone,
        },
        { merge: true }
      );

      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {id && isValidId ? (
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
      ) : (
        <section className="main-edit">
          <div className="student-data">
            <h3 className="title">O Professor não existe</h3>
            <form>
              <footer>
                <a href="/admin-home" className="btn back">
                  Voltar
                </a>
              </footer>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
