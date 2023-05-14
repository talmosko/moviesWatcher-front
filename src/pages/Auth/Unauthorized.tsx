import PageLayout from "../PageLayout";

const UnauthorizedPage = () => {
  const pageTitle = "Unauthorized";
  const pageSubTitle =
    "You are not authorized to view this page. Please contact your administrator.";
  return (
    <PageLayout
      pageTitle={pageTitle}
      pageSubTitle={pageSubTitle}
      className="flex-col"
    ></PageLayout>
  );
};

export default UnauthorizedPage;
 