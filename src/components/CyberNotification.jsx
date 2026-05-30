import { motion } from "framer-motion";

function CyberNotification({ message }) {

  return (
    <motion.div
      initial={{
        x: 300,
        opacity: 0,
      }}

      animate={{
        x: 0,
        opacity: 1,
      }}

      exit={{
        opacity: 0,
      }}

      className="
        absolute top-5 right-5
        bg-black
        border border-green-500
        px-5 py-3
        text-green-400
        z-[999]
        shadow-[0_0_20px_#00ff88]
      "
    >
      {message}
    </motion.div>
  );
}

export default CyberNotification;