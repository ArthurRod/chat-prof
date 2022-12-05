import { FormEvent, useState } from "react";
import { auth, db } from "../../services/firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";

export function CadastroEscola() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const createSchool = (e: FormEvent) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        const uid = data.user.uid;

        createSchoolDoc(uid).then(() => {

          sessionStorage.setItem('uid', uid);
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('pass', password);

          alert("Escola cadastrada com sucesso!");
          
          navigate("/admin-home");
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

  const createSchoolDoc = async (uid: string) => {
    
    await setDoc(doc(db, "schools", uid), {
      email: email,
      name: name,
      phone: phone,
    });

    await setDoc(doc(db, "admin-users", uid), {
      type: "school"
    });
  };

  return (
    <>
      <p>Cadastro Escola</p>
      <form onSubmit={createSchool}>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Digite o nome da escola"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
        <input
          type="text"
          id="telefone"
          name="telefone"
          placeholder="Digite o telefone da escola"
          onChange={(event) => setPhone(event.target.value)}
          value={phone}
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite o e-mail"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="on"
          placeholder="Digite a senha"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />

        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
}
