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

export const inViewVariant = {
  zoomView: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.25,
      ease: "easeOut",
    },
  },
  zoomHidden: { scale: 0.9, opacity: 0 },
  leftViewVariant: {
    x: "0",
    opacity: 1,
    transition: { type: "spring", stiffness: 40, damping: 6 },
  },
  leftViewHidden: {
    x: "-100px",
    opacity: 0,
  },
  rightViewVariant: {
    x: "0",
    opacity: 1,
    transition: { stiffness: 40, type: "spring", damping: 20 },
  },
  rightViewHidden: {
    x: "5vw",
    opacity: 0,
  },
  slideTopView: {
    y: "0",
    opacity: 1,
    transition: { stiffness: 40, type: "spring", damping: 20 },
  },
  slideTopHidden: {
    y: "5vh",
    opacity: 1,
    transition: { stiffness: 40, type: "spring", damping: 20 },
  },
};

export const logoRevealVariant = {
  leftShow: {
    x: "0",
    transition: { type: "spring", delay: 0.25 },
  },
  leftHidden: {
    x: "10vw",
  },
  rightShow: {
    opacity: 1,
    transition: { delay: 0.3, duration: 0.5 },
  },
  rightHidden: {
    opacity: 0,
  },
};

export const howWeVariant = {
  leftShow: {
    x: "0",
    transition: { type: "spring", delay: 0.5 },
  },
  leftHidden: {
    x: "50%",
  },
  rightShow: {
    opacity: 1,
    transition: { delay: 0.7, duration: 0.6 },
  },
  rightHidden: {
    opacity: 0,
  },
};
