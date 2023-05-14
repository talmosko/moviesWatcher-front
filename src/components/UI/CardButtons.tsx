import React from "react";

type Props = {
  children: React.ReactNode;
};

const EntityButtons = ({ children }: Props) => {
  return (
    <div className="flex flex-auto justify-end gap-2 items-end pt-2">
      {children}
    </div>
  );
};

export default EntityButtons;
    