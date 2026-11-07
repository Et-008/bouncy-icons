"use client";

import React, { type RefObject } from "react";
import "./style.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "buffer";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  propRef?: RefObject<HTMLButtonElement | null>;
  showAction?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  propRef,
  showAction = false,
  ...props
}: ButtonProps) => {
  const buttonClasses = [
    "btn-base",
    `btn-${variant}`,
    `btn-${size}`,
    className,
  ].join(" ");

  return (
    <button
      ref={propRef}
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      <span className="btn-content">
        {isLoading ? (
          <span className="btn-loader"></span>
        ) : (
          <>
            {leftIcon && (
              <span className="btn-icon btn-icon-left">{leftIcon}</span>
            )}
            {children}
            {rightIcon && (
              <span className="btn-icon btn-icon-right">{rightIcon}</span>
            )}
          </>
        )}
      </span>
      {showAction && <div className="btn-action">Click Me</div>}
    </button>
  );
};

export default Button;
