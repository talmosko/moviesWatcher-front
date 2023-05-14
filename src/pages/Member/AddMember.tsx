import MemberForm from "../../components/Member/MemberForm";
import PageLayout from "../PageLayout";

const AddMember = () => {
  const pageTitle = "Add New Member";

  return (
    <PageLayout pageTitle={pageTitle}>
      <MemberForm />
    </PageLayout>
  );
};

export default AddMember;
  