"use client"
import React, { useState, useEffect, useRef, useCallback } from "react";

interface DropdownProps {
  children: React.ReactNode;
  button: string | React.ReactNode;
  className?: string;
  closeOnClickInside?: boolean;
}

function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: (event: MouseEvent | TouchEvent) => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

const Dropdown: React.FC<DropdownProps> = ({ children, button, className, closeOnClickInside }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Specify the correct type for the ref

  const toggleDropdown = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen); // Use functional state update to ensure correct state transition
  }, []);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const handleContainerClick = () => {
    if (closeOnClickInside) {
      setIsOpen(false);
    }
  }

  return (
    <div ref={dropdownRef} className="dropdown relative" onClick={toggleDropdown}>
      {button}
      {isOpen && (
        <div onClick={handleContainerClick} className={`dropdown-menu absolute top-full left-0 bg-blue-950 overflow-hidden py-1 z-50 ${className ? className : ""}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;