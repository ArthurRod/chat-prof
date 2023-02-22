import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "../contexts/AuthContext";
import { InitialPage } from "../pages/InitialPage";
import { RegisterSchool } from "../pages/RegisterSchool";
import { Home } from "../pages/Home";
import { LoginAdmin } from "../pages/LoginAdmin";
import { NotFound } from "../pages/NotFound";
import { TeacherEdit } from "../pages/TeacherEdit";
import { AdminHome } from "../pages/AdminHome";
import { StudentEdit } from "../pages/StudentEdit";
import { Login } from "../pages/Login";
import { RouteChanger } from "../pages/InitialPage/RouteChanger";
import { Private } from "./Private";
import { PrivateAdmin } from "./PrivateAdmin";

export function RoutesApp() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<InitialPage />}>
            <Route path="" element={<RouteChanger />} />

            <Route path="register-school" element={<RegisterSchool />} />

            <Route path="login-admin" element={<LoginAdmin />} />

            <Route path="login" element={<Login />} />
          </Route>

          <Route
            path="admin-home"
            element={
              <PrivateAdmin>
                <AdminHome />
              </PrivateAdmin>
            }
          />

          <Route
            path="/edit/teacher/:id"
            element={
              <PrivateAdmin>
                <TeacherEdit />
              </PrivateAdmin>
            }
          />

          <Route
            path="/edit/student/:id"
            element={
              <PrivateAdmin>
                <StudentEdit />
              </PrivateAdmin>
            }
          />

          <Route
            path="home"
            element={
              <Private>
                <Home />
              </Private>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
