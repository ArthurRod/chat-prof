import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PaginaInicial } from "../pages/PaginaInicial";
import { CadastroEscola } from "../pages/CadastroEscola";
import { Home } from "../pages/Home";
import { LoginAdmin } from "../pages/LoginAdmin";
import { NotFound } from "../pages/NotFound";
import { AuthProvider } from "../contexts/AuthContext";
import { PrivateAdmin } from "./PrivateAdmin";
import { AdminHomeScholl } from "../pages/AdminHomeScholl";
import { AdminHomeTeacher } from "../pages/AdminHomeTeacher";

export function RoutesApp() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PaginaInicial />} />
          <Route path="cadastro-escola" element={<CadastroEscola />} />
          <Route path="login-admin" element={<LoginAdmin />} />
          <Route path="admin-home/scholl" element={<PrivateAdmin type="scholl"><AdminHomeScholl /></PrivateAdmin>} />
          <Route path="admin-home/teacher" element={<PrivateAdmin type="teacher"><AdminHomeTeacher /></PrivateAdmin>} />
          <Route path="home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
