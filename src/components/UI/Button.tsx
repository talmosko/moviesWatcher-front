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
        " border-2 rounded-2xl text-sm border-blue-700 text-blue-700 w-16 p-1 transition-all hover:scale-110"
      }
    >
      {props.children}
    </button>
  );
};

export default Button;
