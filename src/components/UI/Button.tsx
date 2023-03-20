const Button = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button
      className="border rounded-xl text-xs border-blue-800 text-blue-800 w-12 p-1 transition-all hover:scale-110"
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
