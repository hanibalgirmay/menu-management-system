"use client";

import React from 'react';
import { useFormContext } from 'react-hook-form';

interface IInputProp {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}
const CustomInput: React.FC<IInputProp> = ({
  name,
  type = 'text',
  label,
  placeholder,
}) => {
  const { register } = useFormContext();

  return (
    <div className="col-span-2">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        {...register(name)}
        id={name}
        className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-2xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white disabled:bg-[#EAECF0] disabled:cursor-not-allowed disabled:pointer-events-none"
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomInput;
