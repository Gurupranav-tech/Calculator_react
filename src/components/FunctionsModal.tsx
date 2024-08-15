import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { useMemo, useState } from "react";
import AnimatedButton from "./AnimatedButton";
import { degreesToRadians, formatNumber } from "../utils/formatter";
import { cos, cot, csc, sec, sin, tan } from "../utils/trig";
import { toast } from "react-toastify";

type Props = {
  onExit: () => void;
};

type SelectProps = "sin" | "cos" | "tan" | "sec" | "csc" | "cot";

const trigFns = ["sin", "cos", "tan", "sec", "csc", "cot"];

export default function FunctionsModalWindow({ onExit }: Props) {
  const [selectValue, setSelectedValue] = useState<SelectProps>("sin");
  const [angleType, setAngleType] = useState<"radians" | "degrees">("radians");
  const [number, setNumber] = useState<number>(0);
  const inputArg = useMemo(() => {
    if (!trigFns.find((p) => p === selectValue)) return number;
    if (angleType === "radians") return number;
    return degreesToRadians(number || 0);
  }, [angleType, number]);
  const computed = formatNumber(
    useMemo(() => {
      switch (selectValue) {
        case "sin":
          return sin(inputArg);
        case "cos":
          return cos(inputArg);
        case "tan":
          return tan(inputArg);
        case "sec":
          return sec(inputArg);
        case "csc":
          return csc(inputArg);
        case "cot":
          return cot(inputArg);
        default:
          return 0;
      }
    }, [angleType, inputArg, selectValue])
  );

  const toggleAngleMode = () =>
    setAngleType((p) => (p === "degrees" ? "radians" : "degrees"));

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(computed);
      toast.info("Copied!");
    } catch {
      toast.error("Error copying!");
    }
  };

  return (
    <Backdrop onExit={onExit}>
      <motion.div
        className="functions-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="functions-header">
          <h1>Functions Evaluator</h1>
        </div>
        <div className="controls-container">
          <select
            defaultValue="sin"
            name="functions-selector"
            value={selectValue}
            onChange={(e) => setSelectedValue(e.target.value as SelectProps)}
          >
            <option value="sin">sin</option>
            <option value="cos">cos</option>
            <option value="tan">tan</option>
            <option value="sec">sec</option>
            <option value="csc">csc</option>
            <option value="cot">cot</option>
          </select>
          <input
            type="number"
            name="input"
            id="input"
            value={number === 0 ? "" : number}
            onChange={(e) => setNumber(+e.target.value)}
          />
        </div>
        <div className="functions-results-container">
          <p>
            {selectValue}({number ? formatNumber(number) : 0}) ={" "}
            {computed === "-0" || computed === "0" ? 0 : computed}
          </p>
        </div>
        <div className="functions-copypaste-btns">
          <AnimatedButton
            data-value="angle-type"
            className="calc-btn equal copy"
            onClick={toggleAngleMode}
          >
            Change to {angleType === "degrees" ? "RAD" : "DEG"}
          </AnimatedButton>
          <AnimatedButton
            onClick={copy}
            data-value="copy"
            className="calc-btn equal copy"
          >
            Copy
          </AnimatedButton>
        </div>
      </motion.div>
    </Backdrop>
  );
}
