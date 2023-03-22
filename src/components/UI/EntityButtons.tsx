import React from "react";
import Button from "./Button";

type Props = {
  onEdit: () => void;
  onDelete: () => Promise<void>;
};

const EntityButtons = ({
  onEdit: handleEdit,
  onDelete: handleDelete,
}: Props) => {
  return (
    <div className="flex flex-auto justify-end gap-2 self-end items-end">
      <Button onClick={() => handleEdit()}>Edit</Button>
      <Button onClick={async () => await handleDelete()}>Delete</Button>
    </div>
  );
};

export default EntityButtons;
