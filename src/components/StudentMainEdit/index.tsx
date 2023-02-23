import { FormEvent, useEffect, useState } from "react";
import ReactInputMask from "react-input-mask";
import { db, doc, getDoc, setDoc } from "../../services/firebase";

import { assignData } from "../../helpers/formUpdateFunctions";

interface StudentMainEditProps {
  id: string | undefined;
  isValidId: boolean;
  setIsValidId: (isValidId: boolean) => void;
}

export function StudentMainEdit({
  id,
  isValidId,
  setIsValidId,
}: StudentMainEditProps) {
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
        const { name, fathersPhone } = userData;

        setName(name);
        setFathersPhone(fathersPhone);

        setIsValidId(true);
      }
    }
  };

  const updateStudent = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await setDoc(
        doc(db, "students", id!),
        {
          name: name,
          fathersPhone: fathersPhone,
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {id && isValidId ? (
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
              <ReactInputMask
                type="tel"
                id="telefone"
                name="telefone"
                placeholder="+99 (99) 99999-9999"
                onChange={(event: any) => assignData(event, setFathersPhone)}
                value={fathersPhone}
                mask="+9999999999999"
                required
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
            <h3 className="title">O aluno não existe</h3>
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
