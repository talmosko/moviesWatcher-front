const Card = ({
  children,
  className,
  title,
  subTitle,
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
  title?: string;
  subTitle?: string;
}) => {
  return (
    <div
      className={`${
        className || ""
      } leading-loose flex rounded-md bg-white p-4`}
    >
      {title && subTitle && (
        <div className="pb-2 leading-snug">
          <CardTitle>{title}</CardTitle>
          <CardSubTitle>{subTitle}</CardSubTitle>
        </div>
      )}
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  className,
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return (
    <h3 className={`${className || ""} text-xl text-blue-900 font-semibold`}>
      {children}
    </h3>
  );
};

export const CardSubTitle = ({
  children,
  className,
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return (
    <h4 className={`${className || ""} text-md text-gray-600 font-medium`}>
      {children}
    </h4>
  );
};

export default Card;
  