import { useAdminType } from "../../hooks/useAdminType";
import { LoginAdmin } from "../LoginAdmin";
import { AdminHomeScholl } from "./AdminHomeScholl";
import { AdminHomeTeacher } from "./AdminHomeTeacher";

export function AdminHome() {
    const { adminType } = useAdminType();

    if (!adminType) {
        return <span>Loading...</span>
    }

    switch (adminType.type) {
        case 'scholl':
            return <AdminHomeScholl />
        case 'teacher':
            return <AdminHomeTeacher />
        default:
            return <LoginAdmin />
    }
}
