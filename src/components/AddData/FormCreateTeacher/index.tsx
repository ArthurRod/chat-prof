import { FormEvent, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../../../hooks/useAuth";

type FormCreateTeacherProps = {
  schollId: string | undefined;
};

export function FormCreateTeacher({ schollId }: FormCreateTeacherProps) {
  const { logInWithEmailAndPassword } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createTeacher = (e: FormEvent) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        const uid = data.user.uid;
        const email = sessionStorage.getItem("email");
        const pass = sessionStorage.getItem("pass");

        createDocTeacher(uid)
          .then(async() => {

            if (email && pass) {
              await logInWithEmailAndPassword(email, pass);
            }

            alert("Professor cadastrado com sucesso!");

            clearInputs();
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
      email: email,
      name: name,
      phone: phone,
      schollId: schollId,
    });

    await setDoc(doc(db, "admin-users", uid), {
      type: "teacher",
      isAdmin: true,
    });
  };

  const clearInputs = () => {
    let inputs = document.querySelectorAll("input")
  
    if(inputs) {

      inputs.forEach((item) => item.value = "")

    }

    setName("")
    setPhone("")
    setEmail("")
    setPassword("")
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
        />
        <input
          type="text"
          id="telefone"
          name="telefone"
          placeholder="Digite o telefone do professor"
          onChange={(event) => setPhone(event.target.value)}
          value={phone}
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite o e-mail de acesso"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Digite a senha de acesso"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />

        <button type="submit" className="btn">Cadastrar</button>
      </form>
    </main>
  );
}
