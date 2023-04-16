import { FormEvent, useState } from "react";
import { auth, updateProfile } from "../../../services/firebase";

import { useAuth } from "../../../hooks/useAuth";
import { Loading } from "../../Loading";
import { Alert } from "../../Alert";

export function UpdateUser() {
  const { loadingUser, user } = useAuth();
  const [name, setName] = useState(user && user.name ? user.name : "");
  const [alertMessage, setAlertMessage] = useState("");

  const initialName = user && user.name ? user.name : "";

  function handleUpdateUser(e: FormEvent) {
    e.preventDefault();

    if (user) {
      if (initialName !== name && name.length !== 0) {
        if (auth && auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: name,
          })
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
        }
      } else {
        setAlertMessage("Preencha corretamente o campo.");
      }
    }
  }

  if (loadingUser) return <Loading />;

  return (
    <>
      <form onSubmit={handleUpdateUser}>
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

        <button
          disabled={initialName === name || name.length === 0}
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
