const Button = ({
  type = "button",
  onClick,
  className = "",
  children,
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-5 py-2 my-1 lg:-2 transition ease-in-out duration-300 ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
