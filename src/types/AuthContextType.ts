import { User } from "./User";

export type AuthContextType = {
    user: User | undefined; //se não tiver usuário logado será undefined
	logInWithEmailAndPassword: (email: string, password: string) => void;
}