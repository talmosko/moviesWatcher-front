const Button = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button
      {...props}
      className={
        (props.className || "") +
        " border-2 border-blue-700  rounded-2xl text-sm text-blue-700 w-16 p-1 transition-all hover:scale-110"
      }
    >
      {props.children}
    </button>
  );
};

export default Button;
 