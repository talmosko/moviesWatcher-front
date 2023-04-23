import React from "react";

const Card = ({
  children,
  className,
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return (
    <div className={`${className || ""} w-11/12 flex rounded-md bg-white p-4`}>
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  className,
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return (
    <h3 className={`${className || ""} text-gray-500 font-medium`}>
      {children}
    </h3>
  );
};

export const CardSubTitle = ({
  children,
  className,
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return <h4 className={`${className || ""}  font-semibold`}>{children}</h4>;
};

export default Card;
