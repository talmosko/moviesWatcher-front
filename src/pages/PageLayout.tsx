import React, { ReactNode } from "react";
import { PageTitle } from "../components/UI/PageTitle";
import Button from "../components/UI/Button";

type Props = {
  pageTitle: string;
  titleButtonOnClick?: React.MouseEventHandler;
  titleButtonLabel?: string;
  children: ReactNode;
};

const PageLayout = (props: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <section className="flex flex-row gap-3">
        <PageTitle>{props.pageTitle}</PageTitle>
        {props.titleButtonLabel && props.titleButtonOnClick && (
          <Button className="w-16" onClick={props.titleButtonOnClick}>
            {props.titleButtonLabel}
          </Button>
        )}
      </section>
      <section className="flex gap-4 flex-wrap justify-items-stretch items-stretch">
        {props.children}
      </section>
    </div>
  );
};

export default PageLayout;
