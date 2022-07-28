import { FormEvent } from "react";
import { AdminUser } from "./AdminUser";

export type AuthAdminContextType = {
    user: AdminUser | undefined; //se não tiver usuário logado será undefined
	logInWithEmailAndPassword: (email: string, password: string) => void;
}