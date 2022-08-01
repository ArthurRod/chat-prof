import { User } from "./User";

export type AuthAdminContextType = {
    user: User | undefined; //se não tiver usuário logado será undefined
	logInWithEmailAndPassword: (typedEmail: string, password: string) => void;
}