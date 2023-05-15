import { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import AutoCompleteComponent from "../../../../components/AutoCompleteComponent";
import TableProduct from "../../../../components/Table/TableProduct";
import Layout from "../../../../components/Layout";
import { useGlobal } from "../../../../context/GlobalProvider";

let title = [
  {
    key: "_id",
    name: "ID",
  },
  {
    key: "name",
    name: "Producto",
  },
  {
    key: "price",
    name: "Precio",
  },
  {
    key: "stock",
    name: "Cantidad",
  },
  {
    key: "brand",
    name: "Marca",
  },
  {
    key: "category",
    name: "Categoria",
  },
  {
    key: "igv",
    name: "Igv",
  },
];

const Home = () => {
  const { auth, product, fecthProduct } = useGlobal();
  const [filter, setFilter] = useState({
    dateInit: "",
    dateEnd: "",
    name: "",
  });
  const [search, setSearch] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSuggestionSelect = (suggestion) => {
    setFilter({ ...filter, name: suggestion.name });
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const startDate = filter.dateInit ? new Date(filter.dateInit) : null;
    const endDate = filter.dateEnd ? new Date(filter.dateEnd) : null;

    try {
      const filteredProducts = product.filter((item) => {
        const itemDate = new Date(item.date);
        const dateCondition =
          (!startDate || itemDate >= startDate) &&
          (!endDate || itemDate <= endDate);
        const nameCondition = !filter.name || item.name === filter.name;
        return dateCondition && nameCondition;
      });
      setSearch(filteredProducts);
    } catch (error) {
      console.log(error);
      alert(
        "Ocurrió un problema! o simplemente no escogió ninguna opción de filtrado"
      );
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await fecthProduct(auth.idCompany);
      setSearch(product);
    };

    fetchProducts();
  }, [auth.idCompany, fecthProduct, product]);

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold mb-4 md:mb-0">
              LISTADO DE PRODUCTOS
            </h2>
            <button
              onClick={toggleFilter}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 flex items-center"
            >
              Filtrar
              <FiChevronDown
                className={`ml-2 transition-transform duration-300 ${
                  filterOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>
          </div>
          {filterOpen && (
            <div className="bg-white shadow-md rounded-md p-6">
              <p className="text-gray-500 text-base mb-3">Filtros</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="col-span-1">
                  <h3 className="text-lg font-semibold mb-4">
                    Rango de fechas
                  </h3>
                  <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                    <input
                      type="date"
                      name="dateInit"
                      value={filter.dateInit}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span className="font-semibold">a</span>
                    <input
                      type="date"
                      name="dateEnd"
                      value={filter.dateEnd}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="col-span-1 mt-8 md:mt-0">
                  <h3 className="text-lg font-semibold mb-4">
                    Buscar por nombre
                  </h3>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <AutoCompleteComponent
                      data={product}
                      onSelect={handleSuggestionSelect}
                      inputName="name"
                      inputValue={filter.name}
                      onInputChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 text-white w-full md:w-72 px-6 py-2 rounded-md hover:bg-blue-800"
                >
                  Buscar
                </button>
              </div>
            </div>
          )}
          {/* Aquí iría el contenido de la tabla de productos */}
          <div className="mt-2">
            <TableProduct title={title} data={search} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
