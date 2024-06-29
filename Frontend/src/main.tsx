import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider.tsx";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "sonner";
import { ProductProvider } from "./contexts/ProductContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ProductProvider>
        <App />
      </ProductProvider>
      <Toaster richColors expand={true} />
    </ThemeProvider>
  </React.StrictMode>
);
