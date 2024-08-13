import type { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
};

interface CardProps extends Props {
  dir?: "right" | "left";
}

export function Card({ children, dir = "left" }: CardProps) {
  return (
    <motion.section
      whileHover={{ scale: 1.1 }}
      className="card"
      initial={{ opacity: 0, left: dir === "left" ? "-100vw" : "100vw" }}
      animate={{
        opacity: 1,
        left: "0vw",
        transition: { duration: 1, type: "spring", damping: 15 },
      }}
    >
      {children}
    </motion.section>
  );
}

export function CardHeader({ children }: Props) {
  return <div className="card-header">{children}</div>;
}

export function CardBody({ children }: Props) {
  return <div className="card-body">{children}</div>;
}
