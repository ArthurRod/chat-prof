import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PaginaInicial } from "../pages/PaginaInicial";
import { CadastroEscola } from "../pages/CadastroEscola";
import { Home } from "../pages/Home";
import { LoginAdmin } from "../pages/LoginAdmin";
import { NotFound } from "../pages/NotFound";
import { AuthProvider } from "../contexts/AuthContext";
import { PrivateAdmin } from "./PrivateAdmin";
import { TeacherEdit } from "../pages/TeacherEdit";
import { AdminHome } from "../pages/AdminHome";
import { StudentEdit } from "../pages/StudentEdit";
import { Login } from "../pages/Login";
import { Private } from "./Private";
import { RouteChanger } from "../pages/PaginaInicial/RouteChanger";

export function RoutesApp() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PaginaInicial />}>
            <Route path="" element={<RouteChanger />} />
            <Route path="cadastro-escola" element={<CadastroEscola />} />
            <Route path="login-admin" element={<LoginAdmin />} />
            <Route path="login" element={<Login />} />
          </Route>

          <Route path="admin-home" element={<PrivateAdmin><AdminHome /></PrivateAdmin>}/>
          <Route path="/edit/teacher/:id" element={<TeacherEdit />} />
          <Route path="/edit/student/:id" element={<StudentEdit />} />
          <Route path="home" element={<Private><Home /></Private>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
