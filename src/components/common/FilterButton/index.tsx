import React from "react";
import styles from "./FilterButton.module.css";

interface FilterButtonProps {
  children: React.ReactNode;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  isActive?: boolean;
  className?: string;
  variant?: "category" | "toggle" | "clear" | "submit";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
}

const FilterButton = ({
  children,
  onClick,
  isActive = false,
  className = "",
  variant = "category",
  type = "button",
  ariaLabel,
  ariaExpanded,
  ariaControls,
}: FilterButtonProps) => {
  const getButtonClass = () => {
    switch (variant) {
      case "submit":
        return styles.submitButton;
      case "toggle":
        return styles.toggleButton;
      case "clear":
        return styles.clearButton;
      case "category":
      default:
        return styles.categoryButton;
    }
  };

  const buttonClass =
    `default ${getButtonClass()} ${isActive ? styles.active : ""} ${className}`.trim();

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick ? (event) => onClick(event) : undefined}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
    >
      {children}
    </button>
  );
};

export { FilterButton };
