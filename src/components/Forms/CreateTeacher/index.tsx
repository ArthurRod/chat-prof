import { FormEvent, useState } from "react";
import ReactInputMask from "react-input-mask";
import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
} from "../../../services/firebase";

import { useAdminAuth } from "../../../hooks/useAdminAuth";

type CreateTeacherProps = {
  schoolId: string | undefined;
};

export function CreateTeacher({ schoolId }: CreateTeacherProps) {
  const countryCode = "+55";

  const { reloginUser } = useAdminAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(countryCode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [schoolSubject, setSchoolSubject] = useState("");

  const createTeacher = (e: FormEvent) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        const { uid } = data.user;

        createDocTeacher(uid)
          .then(async () => {
            await reloginUser();
            alert("Professor cadastrado com sucesso!");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        const { message } = error;

        alert(message);
      });
  };

  const createDocTeacher = async (uid: string) => {
    await setDoc(doc(db, "teachers", uid), {
      uid: uid,
      name: name,
      email: email,
      phone: phone,
      schoolId: schoolId,
      schoolSubject: schoolSubject,
    });

    await setDoc(doc(db, "admin-users", uid), {
      type: "teacher",
    });
  };

  return (
    <form id="form-create-teacher" onSubmit={createTeacher}>
      <label htmlFor="nome">Nome do professor</label>
      <input
        type="text"
        id="nome"
        name="nome"
        placeholder="Digite o nome do professor"
        onChange={(event) => setName(event.target.value)}
        value={name}
        required
      />
      <label htmlFor="school-subject">Matéria</label>
      <input
        type="text"
        id="school-subject"
        name="school-subject"
        placeholder="Digite a matéria"
        onChange={(event) => setSchoolSubject(event.target.value)}
        value={schoolSubject}
        required
      />
      <label htmlFor="telefone">Telefone do professor</label>
      <ReactInputMask
        type="tel"
        id="telefone"
        name="telefone"
        placeholder="Digite o telefone do professor"
        onChange={(event) => setPhone(event.target.value)}
        value={phone}
        mask="+99 (99) 99999-9999"
        required
      />
      <label htmlFor="email">E-mail</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Digite o e-mail de acesso"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        required
      />
      <label htmlFor="password">Senha</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Digite a senha de acesso"
        autoComplete="on"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        required
      />

      <button
        disabled={
          name.length === 0 ||
          phone.length === 0 ||
          email.length === 0 ||
          password.length < 6 ||
          schoolSubject.length === 0
        }
        type="submit"
        className="btn"
      >
        Cadastrar
      </button>
    </form>
  );
}
