import { useEffect, useState, ReactNode } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer"; // to detect when elements enter the viewport

const AnimatedComponent = ({
  children,
  _delay,
  _style,
} : {
  children: ReactNode;
  _delay?: number;
  _style?: { [key: string]: any };
}) => {
  const controls = useAnimation(); // control - can start, stop animation
  const [ref, inView] = useInView({ threshold: 0.5 }); // Adjust threshold as needed
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted && inView) {
      controls.start("visible");
    }
  }, [controls, inView, isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.div
      ref={ref || undefined}
      initial="hidden"
      animate={controls}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
        },
        hidden: { opacity: 0, y: 20 },
      }}
      transition={{
        duration: 0.6,
        delay: _delay,
        type: "spring",
        stiffness: 80,
      }}
      style={_style}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedComponent;
