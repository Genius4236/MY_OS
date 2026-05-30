import { motion } from "framer-motion";

function RedAlert() {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.1, 0.4, 0.1],
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
      }}
      className="
        absolute inset-0
        bg-red-500
        z-[998]
        pointer-events-none
      "
    >
      <div
        className="
          absolute inset-0
          flex items-center justify-center
          text-red-100 text-6xl font-bold
        "
      >
        ALERT
      </div>
    </motion.div>
  );
}

export default RedAlert;