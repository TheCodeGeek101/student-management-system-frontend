// src/Utils/motion.ts

interface TextVariantProps {
  delay: number;
}

export const textVariant = ({ delay }: TextVariantProps) => ({
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration: 1.25, delay },
  },
});

interface FadeInProps {
  direction: "left" | "right" | "up" | "down";
  type: string;
  delay: number;
  duration: number;
}

export const fadeIn = ({ direction, type, delay, duration }: FadeInProps) => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { type, delay, duration, ease: "easeOut" },
  },
});

interface ZoomInProps {
  delay: number;
  duration: number;
}

export const zoomIn = ({ delay, duration }: ZoomInProps) => ({
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: "tween", delay, duration, ease: "easeOut" },
  },
});

interface SlideInProps {
  direction: "left" | "right" | "up" | "down";
  type: string;
  delay: number;
  duration: number;
}

export const slideIn = ({ direction, type, delay, duration }: SlideInProps) => ({
  hidden: {
    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
    y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: { type, delay, duration, ease: "easeOut" },
  },
});

interface StaggerContainerProps {
  staggerChildren: number;
  delayChildren?: number;
}

export const staggerContainer = ({ staggerChildren, delayChildren = 0 }: StaggerContainerProps) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

export const dropIn = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "0",
    opacity: 1,
    transition: { duration: 0.1, type: "spring", damping: 25, stiffness: 500 },
  },
  exit: { y: "100vh", opacity: 0 },
};
