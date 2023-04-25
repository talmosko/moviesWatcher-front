import React from "react";

type Props = {
  key: string;
  children: React.ReactNode;
};

const ListItem = (props: Props) => {
  return (
    <li className="font-medium text-sm text-gray-600" key={props.key}>
      {props.children}
    </li>
  );
};

export default ListItem;
