import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";

export function AnimatedCounter({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest: number) => Math.floor(latest));

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 0.8,
      ease: "easeOut",
    });
    return controls.stop;
  }, [value]);

  return <motion.span>{rounded}</motion.span>;
}
