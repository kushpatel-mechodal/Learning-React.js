function Button({
  children,
  type = "button",
  bgColor = "bg-indigo-600 hover:bg-indigo-500",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 cursor-pointer shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 active:scale-[0.98] ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
