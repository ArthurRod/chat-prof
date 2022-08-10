import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { doc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../../../../services/firebase";

import { useAdmin } from "../../../../hooks/useAdmin";
import { useAuth } from "../../../../hooks/useAuth";

export function SettingsContent() {
    const { user } = useAuth();
    const { adminUser, setAdminUser } = useAdmin();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    function handleUpdateScholl(e: FormEvent) {
        e.preventDefault();

        if (user) {

            if (name.length > 0 || phone.length > 0) {

                updateTableScholl(user.uid);

                setAdminUser({
                    name: name,
                    phone: phone,
                });

                alert("Usuário alterado com sucesso!")

            } else {

                alert("Preencha pelo menos um dos campos");

            }
        }
    };

    async function updateTableScholl(uid: string) {
        await updateDoc(doc(db, "escolas", uid), {

            name: name.length > 0 ? name : adminUser?.name,
            phone: phone.length > 0 ? phone : adminUser?.phone

        });
    };

    function handleCloseSettings() {
        let settingsContent = document.querySelector(".settings-content");

        if (settingsContent) {
            if (settingsContent.classList.contains("open"))
                settingsContent.classList.remove("open")
        }
    };

    function handleSignOut() {

        signOut(auth).then(() => {

            navigate("/");

        }).catch((error) => {

            console.log("Ocorreu um erro ao sair: " + error)

        });

    }

    return (

        <div className="settings-content">
            <div className="close-mask" onClick={handleCloseSettings}></div>

            <div className="content">
                <header className="settings-header">
                    <h3 className="title">Configurações de perfil</h3>
                </header>

                <main className="settings-main">
                    <h4 className="main-title">Alterar dados do usuário</h4>
                    <form onSubmit={handleUpdateScholl}>
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Digite um novo nome"
                            onChange={(event) => setName(event.target.value)}
                            value={name}
                        />
                        <label htmlFor="telefone">Telefone</label>
                        <input
                            type="text"
                            id="telefone"
                            name="telefone"
                            placeholder="Digite um novo telefone"
                            onChange={(event) => setPhone(event.target.value)}
                            value={phone}
                        />

                        <button type="submit" className="btn alterate-user">Alterar</button>
                    </form>
                </main>

                <footer className="settings-footer">
                    <button className="btn sign-out" onClick={handleSignOut}>
                        Sair
                    </button>
                </footer>
            </div>
        </div>
    )
}