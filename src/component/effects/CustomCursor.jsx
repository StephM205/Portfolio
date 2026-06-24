import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for dot
  const springX = useSpring(mouseX, { stiffness: 1000, damping: 40, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 1000, damping: 40, mass: 0.1 });

  // Slower springs for ring
  const ringSpringX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.5 });
  const ringSpringY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.5 });

  // Center offsets
  const dotX = useTransform(springX, (val) => val - 6);
  const dotY = useTransform(springY, (val) => val - 6);
  const ringX = useTransform(ringSpringX, (val) => val - 16);
  const ringY = useTransform(ringSpringY, (val) => val - 16);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(14, 77, 164, 0.1)" : "transparent",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};
