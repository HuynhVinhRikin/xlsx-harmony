
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: number;
}

const LoadingSpinner = ({ size = 20 }: LoadingSpinnerProps) => {
  return (
    <motion.div
      className="inline-flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="border-2 border-transparent border-t-current rounded-full"
        style={{
          width: size,
          height: size,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};

export default LoadingSpinner;
