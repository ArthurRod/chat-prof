import { FormEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactInputMask from "react-input-mask";
import { db, doc, getDoc, setDoc } from "../../services/firebase";

import { isStringMaxSize } from "../../helpers/isStringMaxSize";
import { Loading } from "../Loading";

export function TeacherMainEdit() {
  const countryCode = "+55";
  const navigate = useNavigate();
  const { id } = useParams();

  const [initialName, setInitialName] = useState("");
  const [initialPhone, setInitialPhone] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(countryCode);

  const [isValidId, setIsValidId] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTeacherData();
  }, []);

  const getTeacherData = async () => {
    if (id) {
      setLoading(true);

      try {
        const docRef = doc(db, "teachers", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          const { name, phone } = userData;

          setName(name);
          setInitialName(name);
          setPhone(phone);
          setInitialPhone(phone);

          setIsValidId(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const updateTeacher = async (e: FormEvent) => {
    e.preventDefault();

    if (name.length === 0 || !isStringMaxSize(phone, 13)) {
      alert("Preencha corretamente campos");
      return;
    }

    if (initialName === name && initialPhone === phone) {
      alert("Insira novos dados");
      return;
    }

    try {
      await setDoc(
        doc(db, "teachers", id!),
        {
          name: name,
          phone: phone,
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
          <h3 className="title">Editar professor</h3>
          <form onSubmit={updateTeacher}>
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
              onChange={(event) => setPhone(event.target.value)}
              value={phone}
              mask="+99 (99) 99999-9999"
              required
            />

            <div className="bottom">
              <button
                type="submit"
                className="btn"
                disabled={
                  (initialName === name && initialPhone === phone) ||
                  name.length === 0 ||
                  !isStringMaxSize(phone, 13)
                }
              >
                Alterar
              </button>
              <a href="/admin-home" className="btn back">
                Voltar
              </a>
            </div>
          </form>
        </section>
      ) : (
        <section className="main-edit">
          <div className="invalid-id">
            <h3 className="title">O Professor não existe</h3>
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
