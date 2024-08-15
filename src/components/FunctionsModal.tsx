import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { useState } from "react";
import AnimatedButton from "./AnimatedButton";
import { degreesToRadians, formatNumber } from "../utils/formatter";

type Props = {
  onExit: () => void;
};

type SelectProps = "sin" | "cos" | "tan" | "sec" | "csc" | "cot";

const trigFns = ["sin", "cos", "tan", "sec", "csc", "cot"];

export default function FunctionsModalWindow({ onExit }: Props) {
  const [selectValue, setSelectedValue] = useState<SelectProps>("sin");
  const [angleType, setAngleType] = useState<"radians" | "degrees">("radians");
  const [number, setNumber] = useState<number>();

  const toggleAngleMode = () =>
    setAngleType((p) => (p === "degrees" ? "radians" : "degrees"));

  const convertNumber = (n: number) => {
    if (trigFns.find((p) => p === selectValue)) {
      if (angleType === "degrees") return degreesToRadians(n);
    }
    return n;
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
            {selectValue}({number ? formatNumber(convertNumber(number)) : 0}) ={" "}
            {Math.sin(convertNumber(number || 0))}
          </p>
        </div>
        <div className="functions-copypaste-btns">
          <AnimatedButton
            data-value="angle-type"
            className="calc-btn equal copy"
            onClick={toggleAngleMode}
          >
            {angleType === "degrees" ? "DEG" : "RAD"}
          </AnimatedButton>
          <AnimatedButton data-value="copy" className="calc-btn equal copy">
            Copy
          </AnimatedButton>
        </div>
      </motion.div>
    </Backdrop>
  );
}
