import React, { ReactNode, useEffect } from "react";
import { PageTitle } from "../components/UI/PageTitle";
import Button from "../components/UI/Button";
import { PageSubTitle } from "../components/UI/PageSubTitle";

type Props = {
  pageTitle: string;
  pageSubTitle?: string;
  titleButtonOnClick?: React.MouseEventHandler;
  titleButtonLabel?: string;
  children?: ReactNode;
  className?: string;
  hasButtonPermission?: boolean;
};

const PageLayout = (props: Props) => {
  useEffect(() => {
    document.title = props.pageTitle;
  }, [props.pageTitle]);

  return (
    <div className="flex flex-col">
      <section className="flex flex-row gap-3">
        <PageTitle>{props.pageTitle}</PageTitle>
        {props.hasButtonPermission &&
          props.titleButtonLabel &&
          props.titleButtonOnClick && (
            <Button className="w-16" onClick={props.titleButtonOnClick}>
              {props.titleButtonLabel}
            </Button>
          )}
      </section>
      <section>
        {props.pageSubTitle && (
          <PageSubTitle>{props.pageSubTitle}</PageSubTitle>
        )}
      </section>
      {props.children && (
        <section
          className={`${
            props.className || ""
          } flex gap-4 mt-3 flex-wrap justify-items-stretch items-stretch`}
        >
          {props.children}
        </section>
      )}
    </div>
  );
};

export default PageLayout;
   