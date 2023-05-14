import React from "react";

type Props = {
  children: React.ReactNode;
};

const ListItem = (props: Props) => {
  return (
    <li className="font-medium text-sm text-gray-600">{props.children}</li>
  );
};

export default ListItem;
    