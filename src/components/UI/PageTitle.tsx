export const PageTitle = ({
  children,
  className,
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return (
    <h1 className={`${className || ""} text-2xl text-blue-900 font-semibold`}>
      {children}
    </h1>
  );
};
