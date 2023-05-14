type Props = {
  children: React.ReactNode;
};

const UnorderedList = (props: Props) => {
  return <ul className="pl-2">{props.children}</ul>;
};

export default UnorderedList;
    