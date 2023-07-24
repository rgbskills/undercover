import React, { ChangeEvent, FC, useState } from 'react';
import { Icons } from "@/components/Icons";

interface InputProps {
  required?: boolean;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "email" | "number"; // Limit the allowed types
  placeholder?: string;
  minLength?: number;
  className?: string;
  label: string;
}

const Input: FC<InputProps> = ({
  required = false,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  minLength,
  className,
  label,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className='text-slate-600 text-xs pb-2 font-semibold'>{label}</label>
      <div className='relative'>
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          id={name}
          name={name}
          value={value}
          required={required}
          placeholder={placeholder}
          minLength={minLength}
          onChange={onChange}
          className="border-2 text-sm placeholder:text-slate-500 text-white border-blue-950 bg-black h-12 px-4 mb-5 w-full rounded-md outline-none focus:ring-1 focus:ring-blue-900"
        />
        {/*
          TODO: it would be better to have a fake input for passwords
          and the actual input should be with 48px shorter so that
          password manager dont lay over the show/hide button
        */}
        {type === 'password' && (
          <div className='absolute top-0 left-full ml-3 flex justify-center items-center h-12'>
            <button type="button" onClick={toggleShowPassword} className=''>
              {showPassword ? <Icons.hide /> : <Icons.show />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;