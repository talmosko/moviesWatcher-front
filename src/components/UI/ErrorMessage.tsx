import React, { ReactNode } from "react";

const ErrorMessage = ({
  className,
  children,
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return <p className={`text-xs text-red-800 ${className}`}>{children}</p>;
};

export default ErrorMessage;
