import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import ReactInputMask from "react-input-mask";
import { ArrowLeft } from "phosphor-react";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { useAdminAuth } from "../../hooks/useAdminAuth";
import { UserConected } from "../../routes/UserConected";
import { Loading } from "../../components/Loading";

import "../../styles/login-register.scss";

export function RegisterSchool() {
  const { loadingUser, user } = useAdminAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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

          createSchoolDocs(uid)
            .then(() => {
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

  const createSchoolDocs = async (uid: string) => {
    await setDoc(doc(db, "schools", uid), {
      name: name,
      email: email,
      phone: phone,
    });

    await setDoc(doc(db, "admin-users", uid), {
      type: "school",
    });
  };

  if (loadingUser) {
    return <Loading />;
  }

  return (
    <>
      {user ? (
        <UserConected pathName="register-school" />
      ) : (
        <div className="login-register register-school">
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
      )}
    </>
  );
}
