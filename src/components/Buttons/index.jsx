import React from "react";
import { Button } from "@mantine/core";

const CustomButton = ({
  type,
  radius,
  size,
  label,
  action,
  category,
  variant,
  color,
  rightIcon,
  maxWidth,
  disabled,
  loading,
  show = true,
}) => {
  const mainColour = () => {
    if (category === "primary") {
      return "var(--secondary-color)";
    }
    if (category === "landing") {
      return "var(--red-shade-color)";
    }
    if (category === "grey") {
      return "var(--ternary-color)";
    }
  };

  const hoverColour = () => {
    if (category === "primary") {
      return "var(--red-shade-color)";
    }
    if (category === "landing") {
      return "var(--secondary-color)";
    }
    if (category === "grey") {
      return "var(--primary-color)";
    }
  };

  const textColor = () => {
    if (category === "landing") {
      return "#fff";
    }
  };

  const hoverTextColor = () => {
    if (category === "landing") {
      return "#fff";
    }
  };

  return (
    show && (
      <Button
        styles={(theme) => ({
          root: {
            backgroundColor: mainColour(),
            transition: "all 0.5s",
            color: textColor(),
            width: maxWidth && "100%",

            "&:hover": {
              backgroundColor: hoverColour(),
              color: hoverTextColor(),
            },
          },
        })}
        radius={radius}
        size={size}
        onClick={action}
        type={type}
        color={color}
        variant={variant}
        rightIcon={rightIcon}
        disabled={disabled}
        loading={loading}
      >
        {label}
      </Button>
    )
  );
};

export default CustomButton;
