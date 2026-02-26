import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HeroUIProvider } from "@heroui/react";
import AuthContext from "./Componants/Context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const clint = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={clint}>
    <HeroUIProvider>
      <AuthContext>
        <App />
      </AuthContext>
    </HeroUIProvider>
  </QueryClientProvider>,
);
