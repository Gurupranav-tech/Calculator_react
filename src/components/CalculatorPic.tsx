import { Card, CardBody, CardHeader } from "./Card";
import CalcPic from "../assets/calculator.svg";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const MyLink = motion(Link);

export default function CalculatorPic() {
  return (
    <div className="card-container">
      <Card dir="left">
        <CardHeader>
          <h3>Calculator</h3>
        </CardHeader>
        <CardBody>
          <img src={CalcPic} alt="Calculator Pic" className="home-calcimage" />
          <MyLink
            to="/calculator"
            className="btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Go <FaArrowRight />
          </MyLink>
        </CardBody>
      </Card>
      <Card dir="right">
        <CardHeader>
          <h3>Equation Solver</h3>
        </CardHeader>
        <CardBody>
          <img src={CalcPic} alt="Calculator Pic" className="home-calcimage" />
          <MyLink
            to="/calculator"
            className="btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Go <FaArrowRight />
          </MyLink>
        </CardBody>
      </Card>
    </div>
  );
}
