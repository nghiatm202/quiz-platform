import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "disabled";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  ...rest
}) => {
  let variantClasses = "";

  switch (variant) {
    case "secondary":
      variantClasses = "bg-gray-200 text-gray-700";
      break;
    case "disabled":
      variantClasses = "bg-gray-400 text-gray-300 cursor-not-allowed";
      break;
    case "primary":
    default:
      variantClasses =
        "bg-primary text-white hover:opacity-85 transition-opacity";
      break;
  }

  const combinedClassName = `px-4 py-2 rounded-md focus:outline-none ${variantClasses} ${className}`;

  return <button className={combinedClassName} {...rest} />;
};

export default Button;
