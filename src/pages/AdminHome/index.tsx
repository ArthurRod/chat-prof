import { useAdmin } from "../../hooks/useAdmin";
import { LoginAdmin } from "../LoginAdmin";
import { AdminHomeScholl } from "./AdminHomeScholl";
import { AdminHomeTeacher } from "./AdminHomeTeacher";

export function AdminHome() {
  const { admin } = useAdmin();

  if (!admin) {
    return <span>Loading...</span>;
  }

  if (admin.isAdmin) {
    switch (admin.type) {
      case "scholl":
        return <AdminHomeScholl />;
      case "teacher":
        return <AdminHomeTeacher />;
      default:
        return <LoginAdmin />;
    }
  } else {
    return <LoginAdmin />;
  }
}
