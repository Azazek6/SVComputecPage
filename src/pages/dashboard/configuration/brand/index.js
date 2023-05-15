import { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/router";
import TableListSimple from "../../../../components/Table/TableListSimple";
import Layout from "../../../../components/Layout";
import { useGlobal } from "../../../../context/GlobalProvider";

let title = [
  {
    key: "_id",
    name: "ID",
  },
  {
    key: "name",
    name: "Nombre",
  },
  {
    key: "status",
    name: "Estado",
  },
];

const Home = () => {
  const router = useRouter();

  const { auth, brand, fecthBrand } = useGlobal();

  useEffect(() => {
    fecthBrand(auth.idCompany);
  }, [auth.idCompany, fecthBrand]);

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Listado de marcas</h2>
            {/* Agrega un botón para registrar nuevas marcas */}
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push("/dashboard/configuration/brand/create");
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 flex items-center"
            >
              <FiPlus className="mr-2" />
              Nueva Marca
            </button>
          </div>
          <TableListSimple title={title} data={brand} />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
