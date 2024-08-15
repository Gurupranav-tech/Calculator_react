import "./index.css";
import "react-toastify/ReactToastify.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import router from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer theme="colored" transition={Bounce} />
  </StrictMode>
);
