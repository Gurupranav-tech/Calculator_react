import CalculatorPic from "../components/CalculatorPic";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="circle" style={{ top: "40vh", left: "60vw" }}></div>
      <div className="circle" style={{ left: "10vw", top: "20vh" }}></div>
      <div className="container pic-container">
        <CalculatorPic />
      </div>
    </>
  );
}
