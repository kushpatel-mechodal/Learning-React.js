import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  {
    label,
    type = "text",
    placeholder = "",
    className = "",
    ...props
  },
  ref,
) {
  const id = useId();

  return (
    <div className="w-full text-left">
      {label && (
        <label
          className="inline-block mb-1.5 text-sm font-medium text-gray-300"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`px-3.5 py-2.5 rounded-xl bg-gray-900/70 text-white placeholder-gray-500 outline-none focus:bg-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/25 duration-200 border border-gray-700/80 w-full transition-all ${className}`}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
});

export default Input;
