import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const MouseSpotlight = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 400); // 400 is half of width (800)
      mouseY.set(e.clientY - 400);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 w-[800px] h-[800px] rounded-full z-0 mix-blend-screen"
      style={{
        x: springX,
        y: springY,
        background: `radial-gradient(circle, rgba(14, 77, 164, 0.08) 0%, rgba(10, 10, 15, 0) 70%)`,
      }}
    />
  );
};
