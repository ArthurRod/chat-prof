import { FormEvent, useState } from "react";
import ReactInputMask from "react-input-mask";
import {
  auth,
  db,
  doc,
  setDoc,
  createUserWithEmailAndPassword,
} from "../../../services/firebase";

import { useAuth } from "../../../hooks/useAuth";
import { clearInputs } from "../../../helpers/formUpdateFunctions";

type FormCreateTeacherProps = {
  schoolId: string | undefined;
};

export function FormCreateTeacher({ schoolId }: FormCreateTeacherProps) {
  const countryCode = "+55";

  const { logInWithEmailAndPassword } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(countryCode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [schoolSubject, setSchoolSubject] = useState("");

  const createTeacher = (e: FormEvent) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        const uid = data.user.uid;
        const email = sessionStorage.getItem("email");
        const pass = sessionStorage.getItem("pass");

        createDocTeacher(uid)
          .then(async () => {
            if (email && pass) {
              await logInWithEmailAndPassword(email, pass);
            }

            alert("Professor cadastrado com sucesso!");

            clearInputs();
            setName("");
            setPhone(countryCode);
            setEmail("");
            setPassword("");
            setSchoolSubject("");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
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
    <main className="main">
      <form onSubmit={createTeacher}>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Digite o nome do professor"
          onChange={(event) => setName(event.target.value)}
          value={name}
          required
        />
        <input
          type="text"
          id="school-subject"
          name="school-subject"
          placeholder="Digite a matéria"
          onChange={(event) => setSchoolSubject(event.target.value)}
          value={schoolSubject}
          required
        />
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
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite o e-mail de acesso"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          required
        />
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
            password.length === 0 ||
            schoolSubject.length === 0
          }
          type="submit"
          className="btn"
        >
          Cadastrar
        </button>
      </form>
    </main>
  );
}
