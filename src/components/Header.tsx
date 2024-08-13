import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      className="header"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
    >
      <h1>Calculator</h1>
    </motion.header>
  );
}
