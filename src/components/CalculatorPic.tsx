import { Card, CardBody, CardHeader } from "./Card";
import CalcPic from "../assets/calculator.svg";
import QuadPic from "../assets/quadsolver.png";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const MyLink = motion(Link);

export default function CalculatorPic() {
  const navigate = useNavigate();

  return (
    <div className="card-container">
      <Card dir="left" click={() => navigate("/calculator")}>
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
      <Card dir="right" click={() => navigate("/quadsolver")}>
        <CardHeader>
          <h3>Quadratic Equation Solver</h3>
        </CardHeader>
        <CardBody>
          <img src={QuadPic} alt="Calculator Pic" className="home-calcimage" />
          <MyLink
            to="/quadsolver"
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
