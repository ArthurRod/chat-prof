import { useAdmin } from "../../hooks/useAdmin";
import { LoginAdmin } from "../LoginAdmin";
import { AdminHomeScholl } from "./AdminHomeScholl";
import { AdminHomeTeacher } from "./AdminHomeTeacher";

export function AdminHome() {
    const { adminUser } = useAdmin();

    if (!adminUser) {
        return <span>Loading...</span>
    }

    switch (adminUser.type) {
        case 'scholl':
            return <AdminHomeScholl />
        case 'teacher':
            return <AdminHomeTeacher />
        default:
            return <LoginAdmin />
    }
}
