import React, { forwardRef } from "react";

const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>((props, ref) => {
  return (
    <select
      {...props}
      ref={ref}
      className={
        (props.className || "") +
        " border pl-2 rounded-md col-start-1 text-sm col-end-3 bg-white row-start-2 w-72 sm:w-80 h-8 border-blue-800 text-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
      }
    >
      {props.children}
    </select>
  );
});

export default Select;
    