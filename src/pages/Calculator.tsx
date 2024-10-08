import { FaBackspace, FaCopy, FaPaste } from "react-icons/fa";
import { MdFunctions } from "react-icons/md";
import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { formatNumber } from "../utils/formatter";
import AnimatedButton from "../components/AnimatedButton";
import FunctionsModal from "../components/FunctionsModal";
import { toast } from "react-toastify";

type Operator = "+" | "-" | "*" | "/" | "=" | "None";

function compute(a: number, b: number, op: Operator): number {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      return a + b;
  }
}

export default function Calculator() {
  const [numberStr, setNumberStr] = useState<string>("");
  const numberTyped = useMemo(() => parseFloat(numberStr), [numberStr]);
  const [prevNumberType, setPrevNumberTyped] = useState<number>(0);
  const [operator, setOperator] = useState<Operator>("None");
  const [decimalAdded, setDecimalAdded] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleClick = (n: number) => () =>
    setNumberStr((prev) => prev + `${n}`);

  const operatorHandle = (op: Operator) => () => {
    if (operator === "None" && op === "=") return;
    setDecimalAdded(false);
    if (operator !== "None" && op === "=") {
      setNumberStr(`${compute(prevNumberType, numberTyped, operator)}`);
      setPrevNumberTyped(0);
      setOperator("None");
      return;
    }
    if (operator !== "None") {
      setPrevNumberTyped((prev) => compute(prev, numberTyped, operator));
      setOperator(op);
    } else {
      setOperator(op);
      setPrevNumberTyped(numberTyped);
    }
    setNumberStr("");
  };

  const erase = () => {
    setNumberStr("");
    setPrevNumberTyped(0);
    setOperator("None");
    setDecimalAdded(false);
  };

  const rmLdigit = () => {
    if (numberStr[numberStr.length - 1] === ".") setDecimalAdded(false);
    setNumberStr((prev) => prev.substring(0, prev.length - 1));
  };

  const handleDecimal = () => {
    if (decimalAdded) return;
    setDecimalAdded(true);
    setNumberStr((prev) => prev + ".");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${numberTyped}`);
      toast.info("Copied!");
    } catch {
      toast.error("Error copying!");
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!Number.isNaN(Number(text))) setNumberStr(text);
    } catch {}
  };

  return (
    <>
      <div className="calc-container">
        <div className="results-container">
          <div className="sub-result">{`${formatNumber(prevNumberType)} ${
            operator !== "None" ? operator : ""
          }`}</div>
          <div className="main-result">
            <p>{numberStr === "" ? "0" : numberStr.substring(0, 12)}</p>
          </div>
        </div>
        <div className="calc-btns-container">
          <AnimatedButton
            data-value="Ac"
            className="calc-btn fn"
            onClick={erase}
          >
            AC
          </AnimatedButton>
          <AnimatedButton
            data-value="backspace"
            className="calc-btn fn"
            onClick={rmLdigit}
          >
            <FaBackspace />
          </AnimatedButton>
          <AnimatedButton
            onClick={operatorHandle("/")}
            data-value="/"
            className="calc-btn operator"
          >
            /
          </AnimatedButton>
          <AnimatedButton
            onClick={operatorHandle("*")}
            className="calc-btn operator"
            data-value="*"
          >
            *
          </AnimatedButton>
          <AnimatedButton
            className="calc-btn"
            data-value="7"
            onClick={handleClick(7)}
          >
            7
          </AnimatedButton>
          <AnimatedButton
            className="calc-btn"
            data-value="8"
            onClick={handleClick(8)}
          >
            8
          </AnimatedButton>
          <AnimatedButton
            className="calc-btn"
            data-value="9"
            onClick={handleClick(9)}
          >
            9
          </AnimatedButton>
          <AnimatedButton
            onClick={operatorHandle("-")}
            className="calc-btn operator"
            data-value="-"
          >
            -
          </AnimatedButton>
          <AnimatedButton
            className="calc-btn"
            data-value="4"
            onClick={handleClick(4)}
          >
            4
          </AnimatedButton>
          <AnimatedButton
            className="calc-btn"
            data-value="5"
            onClick={handleClick(5)}
          >
            5
          </AnimatedButton>
          <AnimatedButton
            className="calc-btn"
            data-value="6"
            onClick={handleClick(6)}
          >
            6
          </AnimatedButton>
          <AnimatedButton
            onClick={operatorHandle("+")}
            className="calc-btn operator"
            data-value="+"
          >
            +
          </AnimatedButton>
          <AnimatedButton
            className="calc-btn"
            data-value="1"
            onClick={handleClick(1)}
          >
            1
          </AnimatedButton>
          <AnimatedButton
            className="calc-btn"
            data-value="2"
            onClick={handleClick(2)}
          >
            2
          </AnimatedButton>
          <AnimatedButton
            className="calc-btn"
            data-value="3"
            onClick={handleClick(3)}
          >
            3
          </AnimatedButton>
          <AnimatedButton
            onClick={operatorHandle("=")}
            className="calc-btn two-row equal"
            data-value="="
          >
            =
          </AnimatedButton>
          <AnimatedButton
            className="calc-btn two-col"
            data-value="0"
            onClick={handleClick(0)}
          >
            0
          </AnimatedButton>
          <AnimatedButton
            onClick={handleDecimal}
            className="calc-btn"
            data-value="."
          >
            .
          </AnimatedButton>
          <AnimatedButton
            data-value="copy"
            className="calc-btn clipboard"
            onClick={handleCopy}
          >
            <FaCopy />
          </AnimatedButton>
          <AnimatedButton
            data-value="paste"
            className="calc-btn clipboard"
            onClick={handlePaste}
          >
            <FaPaste />
          </AnimatedButton>
          <AnimatedButton
            data-value="paste"
            className="calc-btn two-col clipboard"
            onClick={() => setModalOpen(true)}
          >
            Functions <MdFunctions />
          </AnimatedButton>
        </div>
      </div>
      <AnimatePresence>
        {modalOpen && <FunctionsModal onExit={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
