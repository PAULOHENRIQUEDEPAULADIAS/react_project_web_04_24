import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import { AuthProvider } from "./services/authcontext.jsx";
import AppProvider from "./context.jsx";

createRoot(document.getElementById("root")).render(
  <AppProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </AppProvider>
);
