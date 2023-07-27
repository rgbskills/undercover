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
  const buttonClasses = `${unstyled ? "" : "flex items-center gap-3 h-12 px-6 rounded-md bg-blue-950 text-sm font-semibold hover:bg-blue-900 transition-all"} ${className || ""}`;

  if (href) {
    return (
      <Link href={href} className={buttonClasses} disabled={disabled}>
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