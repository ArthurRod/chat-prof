import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PaginaInicial } from "../pages/PaginaInicial";
import { CadastroEscola } from "../pages/CadastroEscola";
import { Home } from "../pages/Home";
import { LoginAdmin } from "../pages/LoginAdmin";
import { NotFound } from "../pages/NotFound";
import { AuthProvider } from "../contexts/AuthContext";
import { PrivateAdmin } from "./PrivateAdmin";
import { AdminHome } from "../pages/AdminHome";
import { AdminHomeScholl } from "../pages/AdminHome/AdminHomeScholl";
import { AdminHomeTeacher } from "../pages/AdminHome/AdminHomeTeacher";

export function RoutesApp() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PaginaInicial />} />
          <Route path="cadastro-escola" element={<CadastroEscola />} />
          <Route path="login-admin" element={<LoginAdmin />} />
          <Route path="admin-home" element={<PrivateAdmin><AdminHome /></PrivateAdmin>}/>
          <Route path="home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
