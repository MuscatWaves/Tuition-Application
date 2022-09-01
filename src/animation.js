export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const item = {
  hidden: {
    opacity: 0,
    y: "100px",
  },
  show: {
    opacity: 1,
    y: 0,
    delay: 0.7,
    transition: {
      type: "spring",
      stiffness: 40,
      damping: 9,
    },
  },
};

export const zoomItem = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    scale: 1,
    delay: 0.2,
    transition: {
      type: "spring",
      stiffness: 40,
      damping: 9,
    },
  },
};

export const leftMenuVariant = {
  show: {
    x: "0",
    opacity: 1,
    transition: { type: "spring", stiffness: 40, damping: 6 },
  },
  hidden: {
    x: "-100px",
    opacity: 0,
  },
};

export const heading = {
  hidden: { opacity: 1, y: "60px" },
  show: {
    y: "0",
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 40,
      damping: 9,
    },
  },
};
