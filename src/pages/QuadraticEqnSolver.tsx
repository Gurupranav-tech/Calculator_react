import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TbAlpha, TbBeta } from "react-icons/tb";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { sqrt } from "../utils/log";
import { formatNumber } from "../utils/formatter";
import AnimatedButton from "../components/AnimatedButton";

export default function QuadraticEqnSolver() {
  const navigate = useNavigate();

  const squaredRef = useRef<HTMLInputElement>(null);
  const linearRef = useRef<HTMLInputElement>(null);
  const constantRef = useRef<HTMLInputElement>(null);

  const [alpha, setAlpha] = useState<number | null | "all">(null);
  const [beta, setBeta] = useState<number | null | "all">(null);

  const compute = () => {
    if (
      squaredRef.current === null ||
      linearRef.current === null ||
      constantRef.current === null
    )
      return;

    const a = +squaredRef.current.value;
    const b = +linearRef.current.value;
    const c = +constantRef.current.value;

    if (a === 0 && b === 0 && c === 0) {
      setAlpha("all");
      setBeta("all");
      return;
    }

    const d = b * b - 4 * a * c;
    if (d < 0) {
      setAlpha(null);
      setBeta(null);
    } else {
      setAlpha((-b + sqrt(d)) / 2 / a);
      setBeta((-b - sqrt(d)) / 2 / a);
    }
  };

  useEffect(compute);
  useEffect(() => {
    if (
      squaredRef.current === null ||
      linearRef.current === null ||
      constantRef.current === null
    )
      return;

    const squareAbort = new AbortController();
    const linearAbort = new AbortController();
    const constantAbort = new AbortController();

    squaredRef.current.addEventListener("keyup", () => compute(), squareAbort);
    linearRef.current.addEventListener("keyup", () => compute(), linearAbort);
    constantRef.current.addEventListener(
      "keyup",
      () => compute(),
      constantAbort
    );

    return () => {
      squareAbort.abort();
      linearAbort.abort();
      constantAbort.abort();
    };
  }, [squaredRef.current, linearRef.current, constantRef.current]);

  const format = (a: typeof alpha) => {
    if (a === null) return "Undefined";
    if (a === "all") return "All Real Number";
    return formatNumber(a);
  };

  return (
    <>
      <motion.div
        className="quad-container"
        initial={{ top: "-100vh" }}
        animate={{ top: "50vh", transition: { type: "spring", delay: 0.25 } }}
        exit={{ top: "100vh" }}
      >
        <header>
          <h1>Quadratic Equation Solver</h1>
        </header>
        <div className="equation-input">
          <div className="square">
            <input ref={squaredRef} type="number" name="xsquare" />
            <span>x&sup2;</span>
          </div>
          <span className="operator">+</span>
          <div className="linear">
            <input ref={linearRef} type="number" name="xlinear" />
            <span>x</span>
          </div>
          <span className="operator">+</span>
          <div className="constatn">
            <input ref={constantRef} type="number" name="constant" />
          </div>
          <span className="operator">=</span>
          <span>0</span>
        </div>
        <div className="quadres-container">
          <div className="alpha">
            <TbAlpha />: {format(alpha)}
          </div>
          <div className="beta">
            <TbBeta />: {format(beta)}
          </div>
        </div>
        <AnimatedButton
          onClick={() => navigate("/")}
          data-value="go-back"
          className="calc-btn equal copy"
        >
          <IoMdArrowBack />
          Go Back
        </AnimatedButton>
      </motion.div>
    </>
  );
}
