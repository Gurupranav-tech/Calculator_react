import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import QuadraticEqnSolver from "./pages/QuadraticEqnSolver";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/calculator",
    element: <Calculator />,
  },
  {
    path: "/quadsolver",
    element: <QuadraticEqnSolver />,
  },
]);

export default router;
