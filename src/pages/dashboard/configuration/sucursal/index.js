import { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/router";
import Layout from "../../../../components/Layout";
import TableListSimple from "../../../../components/Table/TableListSimple";
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
    key: "schedule",
    name: "Horario",
  },
];

const Home = () => {
  const { auth, sucursal, fecthSucursal } = useGlobal();
  const router = useRouter();

  useEffect(() => {
    fecthSucursal(auth.idCompany);
  }, [auth.idCompany, fecthSucursal]);

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Listado de sucursales</h2>
            {/* Agrega un botón para registrar nuevas marcas */}
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push("/dashboard/configuration/sucursal/create");
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 flex items-center"
            >
              <FiPlus className="mr-2" />
              Nueva Sucursal
            </button>
          </div>
          <TableListSimple title={title} data={sucursal} />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
