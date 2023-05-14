export const PageSubTitle = ({
  children,
  className,
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return (
    <h2 className={`${className || ""} text-xl text-gray-500 font-semibold`}>
      {children}
    </h2>
  );
};
    