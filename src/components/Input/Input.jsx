import React from "react";

const Input = ({ label, type, register, validation, error, ...props }) => {
  return (
    <div className="flex flex-col my-5">
      {label && <label className="mb-2">{label}</label>}
      <input
        type={type}
        className={`p-[.4rem] rounded-full text-sm border-2 border-gray-600 shadow-xl ${
          error ? "border-red-500" : ""
        }`}
        {...register(label.toLowerCase(), validation)}
        {...props}
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

export default Input;
