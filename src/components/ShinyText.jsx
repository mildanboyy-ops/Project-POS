import React from "react";
import { motion } from "framer-motion";

export default function ShinyText({
  text,
  disabled = false,
  speed = 3,
  className = "",
  style = {},
}) {
  const animationDuration = `${speed}s`;

  return (
    <motion.div
      className={`inline-block text-transparent bg-clip-text ${
        disabled ? "" : "animate-shine"
      } ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        animationDuration: animationDuration,
        ...style,
      }}
      initial={{ backgroundPosition: "100% 0" }}
      animate={
        disabled
          ? {}
          : { backgroundPosition: ["100% 0", "-100% 0"] }
      }
      transition={{
        repeat: Infinity,
        duration: speed,
        ease: "linear",
      }}
    >
      {text}
    </motion.div>
  );
}
