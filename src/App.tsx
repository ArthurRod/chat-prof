import { AuthAdminProvider } from "./contexts/AuthAdminContext";
import { RoutesApp } from "./routes";

function App() {
  return (
    <AuthAdminProvider>
      < RoutesApp />
    </AuthAdminProvider>
  );
}

export default App;