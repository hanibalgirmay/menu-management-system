"use client";

import { ChevronUp, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface IOption {
  name: string;
  value: string;
}

interface ISelectProp {
  options: IOption[];
  name: string;
  label: string;
  disabled?: boolean;
}
const CustomSelect: React.FC<ISelectProp> = ({
  name,
  label,
  options,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFocus = () => setIsOpen(true);
  const handleBlur = () => setIsOpen(false);

  const { register } = useFormContext();

  return (
    <div className="w-full">
      <label
        htmlFor="category"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={name}
          disabled={disabled}
          {...register(name)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-2xl focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:bg-[#EAECF0] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value={undefined}>Choose a {label}</option>
          {options.map((i) => (
            <option value={i.value}>{i.name}</option>
          ))}
        </select>
        <span className="absolute flex items-center h-full justify-center right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </span>
      </div>
    </div>
  );
};

export default CustomSelect;
