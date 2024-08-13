import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/calculator",
    element: <Calculator />,
  },
]);

export default router;
