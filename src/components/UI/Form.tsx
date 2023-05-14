import React, { FormEventHandler } from "react";

type Props = {
  children: React.ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

const Form = (props: Props) => {
  return (
    <form className="flex flex-wrap gap-2 flex-col" onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
};

export default Form;
 