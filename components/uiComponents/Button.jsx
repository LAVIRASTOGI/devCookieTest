import React from "react";
import PropTypes from "prop-types";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  mobileSize = "md",
  laptopSize = "lg",
  isLoading = false,
  disabled = false,
  fullWidth = false,
  className = "",
  onClick,
  ...props
}) => {
  // Base styles that will be common for all buttons
  const baseStyles =
    " font-semibold transition-all duration-300 rounded-2xl hover:scale-105"; // Added hover:scale-105 for smooth scaling

  // Size variations
  const sizeStyles = {
    sm: {
      mobile: "px-3 py-1.5 text-sm",
      laptop: "px-4 py-2 text-sm",
    },
    md: {
      mobile: "px-4 py-2 text-base",
      laptop: "px-6 py-2.5 text-base",
    },
    lg: {
      mobile: "px-5 py-2.5 text-lg",
      laptop: "px-8 py-3 text-lg",
    },
    xl: {
      mobile: "px-6 py-3 text-xl",
      laptop: "px-10 py-4 text-xl",
    },
  };

  // Variant styles
  const variantStyles = {
    primary: "bg-primary hover:bg-primary-focus text-white border-none",
    secondary: "bg-secondary hover:bg-secondary-focus text-white border-none",
    orange: "bg-orange-500 hover:bg-orange-500/90",
    outline:
      "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "bg-transparent hover:bg-primary/10 text-primary",
    error: "bg-error hover:bg-error-focus text-white border-none",
    success: "bg-success hover:bg-success-focus text-white border-none",
    warning: "bg-warning hover:bg-warning-focus text-white border-none",
    info: "bg-info hover:bg-info-focus text-white border-none",
  };

  // Loading and disabled styles
  const stateStyles = {
    loading: "opacity-70 cursor-not-allowed",
    disabled: "opacity-50 cursor-not-allowed pointer-events-none",
  };

  // Combine all styles
  const buttonStyles = `
    ${baseStyles}
    ${sizeStyles[mobileSize].mobile} // Mobile size
    lg:${sizeStyles[laptopSize].laptop} // Laptop size
    ${variantStyles[variant]}
    ${isLoading ? stateStyles.loading : ""}
    ${disabled ? stateStyles.disabled : ""}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `;

  return (
    <button
      type={type}
      className={buttonStyles}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading && (
        <span className="loading loading-spinner loading-sm"></span>
      )}
      {children}
    </button>
  );
};

// PropTypes for better development experience
Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf([
    "primary",
    "orange",
    "secondary",
    "outline",
    "ghost",
    "error",
    "success",
    "warning",
    "info",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
