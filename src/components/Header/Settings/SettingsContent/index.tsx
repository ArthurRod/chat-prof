import { doc, updateDoc } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { signOut } from "firebase/auth";
import { useAdmin } from "../../../../hooks/useAdmin";
import { useAuth } from "../../../../hooks/useAuth";
import { db, auth } from "../../../../services/firebase";
import { useNavigate } from "react-router";

export function SettingsContent() {
    const { adminUser, setAdminUser } = useAdmin();
    const { user } = useAuth();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const handleUpdateScholl = (e: FormEvent) => {
        e.preventDefault();

        if (user) {
            
            if(name.length > 0 || phone.length > 0) {

                updateTableScholl(user.uid);

                setAdminUser({
                    name: name,
                    phone: phone,
                });

            } else {

                alert("Preencha pelo menos um dos campos");

            }
        }
    };

    const updateTableScholl = async (uid: string) => {
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
    }

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

                <form onSubmit={handleUpdateScholl}>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        placeholder="Digite um novo nome"
                        onChange={(event) => setName(event.target.value)}
                        value={name}
                    />
                    <input
                        type="text"
                        id="telefone"
                        name="telefone"
                        placeholder="Digite um novo telefone"
                        onChange={(event) => setPhone(event.target.value)}
                        value={phone}
                    />

                    <button type="submit">Alterar</button>
                </form>

                <button onClick={handleSignOut}>
                    Sair
                </button>
            </div>
        </div>
    )
}