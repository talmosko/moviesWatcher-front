import React from "react";
import Button from "./Button";

type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
  children?: React.ReactNode;
};

const EntityButtons = ({ onEdit, onDelete, children }: Props) => {
  return (
    <div className="flex flex-auto justify-end gap-2 items-end pt-2">
      {onEdit && onDelete && (
        <>
          <Button onClick={() => onEdit()}>Edit</Button>
          <Button onClick={() => onDelete()}>Delete</Button>
        </>
      )}
      {!onEdit && !onDelete && children}
    </div>
  );
};

export default EntityButtons;
