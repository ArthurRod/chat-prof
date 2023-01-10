import { FormEvent, useState } from "react";
import { auth, db } from "../../services/firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";

import "../../styles/login-register.scss";
import ReactInputMask from "react-input-mask";

export function CadastroEscola() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const createSchool = (e: FormEvent) => {
    if (
      name.length > 0 &&
      phone.length > 0 &&
      email.length > 0 &&
      password.length > 0
    ) {
      e.preventDefault();

      createUserWithEmailAndPassword(auth, email, password)
        .then((data) => {
          const uid = data.user.uid;

          createSchoolDoc(uid)
            .then(() => {
              sessionStorage.setItem("uid", uid);
              sessionStorage.setItem("email", email);
              sessionStorage.setItem("pass", password);

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
    }
  };

  const createSchoolDoc = async (uid: string) => {
    await setDoc(doc(db, "schools", uid), {
      email: email,
      name: name,
      phone: phone,
    });

    await setDoc(doc(db, "admin-users", uid), {
      type: "school",
    });
  };

  return (
    <div className="login-register school-registration">
      <Link className="back-button" to="/">
        <ArrowLeft size={16} />
        Voltar
      </Link>
      <h3 className="title">Cadastro Escola</h3>
      <form onSubmit={createSchool}>
        <label htmlFor="nome">Nome da escola</label>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Digite o nome da escola"
          onChange={(event) => setName(event.target.value)}
          value={name}
          required
        />
        <label htmlFor="telefone-escola">Telefone</label>
        <ReactInputMask
          type="tel"
          id="telefone-escola"
          name="telefone-escola"
          placeholder="+99 (99) 99999-9999"
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
          placeholder="xxxx@xxxx.com"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          required
        />
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="on"
          placeholder="Digite a senha"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          required
        />

        <button
          disabled={
            name.length === 0 ||
            phone.length === 0 ||
            email.length === 0 ||
            password.length === 0
          }
          className="btn"
          type="submit"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
