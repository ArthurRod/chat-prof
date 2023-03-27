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

type UpdateAdminUserProps = {
  adminType: string;
};

export function UpdateAdminUser({ adminType }: UpdateAdminUserProps) {
  const countryCode = "+55";

  const { user } = useAdminAuth();
  const { adminUser } = useAdmin();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(countryCode);

  useEffect(() => {
    if (adminUser) {
      setName(adminUser.name);
      setPhone(adminUser.phone);
    }
  }, [adminUser]);

  function handleUpdateAdminUser(e: FormEvent) {
    e.preventDefault();

    if (user) {
      if (name.length !== 0 && phone.length !== 0) {
        updateAdminUserTable(user.uid);
        alert("Usuário alterado com sucesso!");
      } else {
        alert("Preencha os campos!");
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

  return (
    <main className="main">
      <h4 className="title">Alterar os seus dados</h4>
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

        <button type="submit" className="btn alterate-user">
          Alterar
        </button>
      </form>
    </main>
  );
}
