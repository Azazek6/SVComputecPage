import {useEffect} from "react";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/router";
import TableListSimple from "../../../../components/Table/TableListSimple";
import Layout from "../../../../components/Layout";
import { useGlobal } from "../../../../context/GlobalProvider";

let title = [
  {
    key: "name",
    name: "Nombre",
  },
];

const Home = () => {
  const {auth,category, fecthCategory} = useGlobal()
  const router = useRouter();

  useEffect(()=>{
    fecthCategory(auth.idCompany)
  },[auth.idCompany, fecthCategory])

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Listado de categorias</h2>
            {/* Agrega un botón para registrar nuevas marcas */}
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push("/dashboard/configuration/category/create");
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 flex items-center"
            >
              <FiPlus className="mr-2" />
              Nueva Categor&iacute;a
            </button>
          </div>
          <TableListSimple title={title} data={category} />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
