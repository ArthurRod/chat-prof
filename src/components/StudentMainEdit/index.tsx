import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactInputMask from "react-input-mask";
import { db, doc, getDoc, setDoc } from "../../services/firebase";

import { isStringMaxSize } from "../../helpers/isStringMaxSize";
import { Loading } from "../Loading";

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
  const countryCode = "+55";
  const navigate = useNavigate();

  const [initialName, setInitialName] = useState("");
  const [initialFathersPhone, setInitialFathersPhone] = useState("");
  const [name, setName] = useState("");
  const [fathersPhone, setFathersPhone] = useState(countryCode);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStudentData();
  }, []);

  const getStudentData = async () => {
    if (id) {
      setLoading(true);

      try {
        const docRef = doc(db, "students", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          const { name, fathersPhone } = userData;

          setName(name);
          setInitialName(name);
          setFathersPhone(fathersPhone);
          setInitialFathersPhone(fathersPhone);

          setIsValidId(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const updateStudent = async (e: FormEvent) => {
    e.preventDefault();

    if (name.length === 0 || !isStringMaxSize(fathersPhone, 13)) {
      alert("Preencha os campos corretamente");
      return;
    }

    if (initialName === name && initialFathersPhone === fathersPhone) {
      alert("Insira novos dados");
      return;
    }

    try {
      await setDoc(
        doc(db, "students", id!),
        {
          name: name,
          fathersPhone: fathersPhone,
        },
        { merge: true }
      );

      alert("Usuário alterado com sucesso");
    } catch (error) {
      console.log(error);
    } finally {
      navigate(-1);
    }
  };

  if (loading) return <Loading />;

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
                onChange={(event) => setName(event.target.value)}
                value={name}
                maxLength={100}
                required
              />
              <ReactInputMask
                type="tel"
                id="telefone"
                name="telefone"
                placeholder="+99 (99) 99999-9999"
                onChange={(event) => setFathersPhone(event.target.value)}
                value={fathersPhone}
                mask="+9999999999999"
                required
              />

              <div className="bottom">
                <button
                  type="submit"
                  className="btn"
                  disabled={
                    (initialName === name &&
                      initialFathersPhone === fathersPhone) ||
                    name.length === 0 ||
                    !isStringMaxSize(fathersPhone, 13)
                  }
                >
                  Alterar
                </button>
                <a href="/admin-home" className="btn back">
                  Voltar
                </a>
              </div>
            </form>
          </div>
        </section>
      ) : (
        <section className="main-edit">
          <div className="invalid-id">
            <h3 className="title">O aluno não existe</h3>
            <div className="bottom">
              <a href="/admin-home" className="btn back">
                Voltar
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
