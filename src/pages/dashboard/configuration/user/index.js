import { useEffect } from "react";
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
  {
    key: "lastnamep",
    name: "Apellido Paterno",
  },
  {
    key: "lastnamem",
    name: "Apellido Materno",
  },
  {
    key: "username",
    name: "Usuario",
  },
  {
    key: "rol",
    name: "rol",
  },
  {
    key: "status",
    name: "Estado",
  },
];

const Home = () => {
  const { auth, fetchUsers, user } = useGlobal();

  const router = useRouter()

  useEffect(() => {
    fetchUsers(auth.idCompany);
  }, [auth.idCompany, fetchUsers]);

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Listado de usuarios</h2>
            {/* Agrega un botón para registrar nuevas marcas */}
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push("/dashboard/configuration/user/create");
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 flex items-center"
            >
              <FiPlus className="mr-2" />
              Nueva Usuario
            </button>
          </div>
          <TableListSimple title={title} data={user} />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
