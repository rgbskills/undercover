import React, { ReactNode } from "react";
import Link from "next/link";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ href, onClick, children, className }) => {
  const buttonClasses = `flex items-center gap-3 h-12 px-6 rounded-md bg-blue-950 text-sm font-semibold ${className}`;

  if (href) {
    return (
      <Link className={buttonClasses} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;