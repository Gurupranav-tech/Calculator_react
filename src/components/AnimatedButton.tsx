import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  "data-value": any;
}

export default function AnimatedButton(props: ButtonProps) {
  return (
    <motion.button
      className={props.className}
      onClick={props.onClick}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      data-value={props["data-value"]}
    >
      {props.children}
    </motion.button>
  );
}
