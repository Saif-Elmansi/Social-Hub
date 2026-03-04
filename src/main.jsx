import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HeroUIProvider } from "@heroui/react";
import AuthContext from "./Componants/Context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UpdateContext from "./Componants/Context/UpdateContext.jsx";

const clint = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={clint}>
    <HeroUIProvider>
      <UpdateContext>
        <AuthContext>
          <App />
        </AuthContext>
      </UpdateContext>
    </HeroUIProvider>
  </QueryClientProvider>,
);
