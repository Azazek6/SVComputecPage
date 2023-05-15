import Layout from "../../../../components/Layout";
import CompanyForm from "../../../../components/Forms/CompanyForm";
import { useGlobal } from "../../../../context/GlobalProvider";

const Home = () => {
  return (
    <Layout>
      <CompanyForm />
    </Layout>
  );
};

export default Home;
