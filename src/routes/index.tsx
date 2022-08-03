import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PaginaInicial } from "../pages/PaginaInicial";
import { CadastroEscola } from "../pages/CadastroEscola";
import { Home } from "../pages/Home";
import { LoginAdmin } from "../pages/LoginAdmin";
import { NotFound } from "../pages/NotFound";
import { AdminHome } from "../pages/AdminHome";
import { AuthProvider } from "../contexts/AuthContext";

const Private = ({ Item }: any) => {
  const signed = false;

  return signed ? <Item /> : <LoginAdmin />;
};

export function RoutesApp() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PaginaInicial />} />
          <Route path="cadastro-escola" element={<CadastroEscola />} />
          <Route path="login-admin" element={<LoginAdmin />} />
          <Route path="admin-home" element={<AdminHome />} />
          <Route path="home" element={<Private Item={<Home />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
