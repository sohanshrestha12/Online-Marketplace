import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.tsx";
import { AuthProvider } from "./components/Auth/ProtectedRoutes.tsx";
import { ProductProvider } from "./contexts/ProductContext.tsx";
import { SocketProvider } from "./contexts/SocketContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ProductProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </ProductProvider>
      </ThemeProvider>
    </AuthProvider>
    <Toaster richColors expand={true} />
  </React.StrictMode>
);
