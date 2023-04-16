import { FormEvent, useEffect, useState } from "react";
import ReactInputMask from "react-input-mask";
import {
  db,
  collection,
  doc,
  getDocs,
  query,
  where,
  setDoc,
} from "../../../services/firebase";

import { useAdmin } from "../../../hooks/useAdmin";
import { useAdminAuth } from "../../../hooks/useAdminAuth";
import { Loading } from "../../Loading";
import { Alert } from "../../Alert";
import { isStringMaxSize } from "../../../helpers/isStringMaxSize";

type UpdateAdminUserProps = {
  adminType: string;
};

export function UpdateAdminUser({ adminType }: UpdateAdminUserProps) {
  const countryCode = "+55";

  const { loadingUser, adminUserAuth } = useAdminAuth();
  const { adminUser } = useAdmin();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState(countryCode);
  const [alertMessage, setAlertMessage] = useState("");

  const initialName = adminUser && adminUser.name ? adminUser.name : "";
  const initialPhone = adminUser && adminUser.phone ? adminUser.phone : "";

  useEffect(() => {
    if (adminUser) {
      setName(adminUser.name);
      setPhone(adminUser.phone);
    }
  }, [adminUser]);

  function handleUpdateAdminUser(e: FormEvent) {
    e.preventDefault();

    if (adminUserAuth) {
      if (
        name.length !== 0 &&
        phone.length !== 0 &&
        (name !== initialName || phone !== initialPhone)
      ) {
        updateAdminUserTable(adminUserAuth.uid)
          .then(() => {
            setAlertMessage(
              "Nome alterado com sucesso, é necessário recarregar a página para que as mudanças tenham efeito"
            );

            setTimeout(() => {
              setAlertMessage("");
            }, 3000);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setAlertMessage("Preencha corretamente os campos.");
      }
    }
  }

  async function updateAdminUserTable(uid: string) {
    if (adminUser && adminType) {
      if (adminType === "school") {
        await setDoc(
          doc(db, "schools", uid),
          {
            name: name,
            phone: phone,
          },
          { merge: true }
        );
      } else if (adminType === "teacher") {
        await setDoc(
          doc(db, "teachers", uid),
          {
            name: name,
            phone: phone,
          },
          { merge: true }
        );

        updateGradesObservations("grades", uid);
        updateGradesObservations("observations", uid);
      }
    }
  }

  async function updateGradesObservations(collectionRef: string, uid: string) {
    const q = query(
      collection(db, collectionRef),
      where("teacherId", "==", uid)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (data: any) => {
      await setDoc(
        doc(db, collectionRef, data.id),
        {
          teacherName: name,
        },
        { merge: true }
      );
    });
  }

  if (loadingUser || !adminUser) return <Loading />;

  return (
    <>
      <form onSubmit={handleUpdateAdminUser}>
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Digite um novo nome"
          onChange={(event) => setName(event.target.value)}
          value={name}
          required
        />
        <label htmlFor="telefone">Telefone</label>
        <ReactInputMask
          type="tel"
          id="telefone"
          name="telefone"
          placeholder="Digite um novo telefone"
          onChange={(event) => setPhone(event.target.value)}
          value={phone}
          mask="+99 (99) 99999-9999"
          required
        />

        <button
          disabled={
            (initialName === name || name.length === 0) &&
            (initialPhone === phone || !isStringMaxSize(phone, 13))
          }
          type="submit"
          className="btn alterate-user"
        >
          Alterar
        </button>
      </form>

      {alertMessage && (
        <Alert title="Aviso" description={alertMessage} defaultOpen={true} />
      )}
    </>
  );
}
