import React from "react";
import Button from "./Button";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

const EntityButtons = ({ onEdit, onDelete }: Props) => {
  return (
    <div className="flex flex-auto justify-end gap-2 self-end items-end">
      <Button onClick={() => onEdit()}>Edit</Button>
      <Button onClick={() => onDelete()}>Delete</Button>
    </div>
  );
};

export default EntityButtons;
