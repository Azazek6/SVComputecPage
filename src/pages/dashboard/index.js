import { useRouter } from "next/router";
import Layout from "../../components/Layout";

const Index = () => {
  const router = useRouter();

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-red-600">Dashboard</h1>
    </Layout>
  );
};

export default Index;
