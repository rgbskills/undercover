"use client"
import React, { ReactNode } from "react";
import Link from "next/link";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  unstyled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  href,
  onClick,
  children,
  className,
  loading,
  disabled,
  type = "button", // Default to "button" type
  unstyled,
}) => {
  const btnDisabled = "bg-gray-600 text-gray-400 pointer-events-none";
  const btnEnabled = "bg-blue-950 text-white hover:bg-blue-900";
  const buttonClasses = `${unstyled ? `${disabled || loading ? btnDisabled : ""}` : `flex items-center gap-3 h-12 px-6 rounded-md text-sm font-semibold transition-all ${disabled || loading ? btnDisabled : btnEnabled}}`} ${className || ""}`;

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {loading ? "Loading..." : children}
      </Link>
    );
  }

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled} type={type}>
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;