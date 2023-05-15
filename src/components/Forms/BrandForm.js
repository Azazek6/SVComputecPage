import { useState } from "react";
import { useGlobal } from "../../context/GlobalProvider";
import InputComponent from "../../components/InputComponent";

const BrandForm = () => {
  const { auth, fecthBrandInsert } = useGlobal();

  const [brand, setBrand] = useState({
    id: "0",
    name: "",
    idCompany: auth.idCompany,
  });

  const handleChange = (e) => {
    setBrand({ ...brand, [e.target.name]: e.target.value });
  };

  const clear = () => {
    setBrand({
      id: "0",
      name: "",
      idCompany: auth.idCompany,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (brand.name == "" || brand.idCompany == "") {
      alert("Faltan campo");
      return;
    }

    try {
      const { status, data } = await fecthBrandInsert(brand);
      if (status == 201) {
        clear();
        alert(`${data.message}`);
      } else {
        alert(`${data.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-md shadow-md w-full">
      <div className="border-b border-gray-200 mb-6 pb-3">
        <h2 className="text-2xl font-semibold">REGISTRAR MARCA</h2>
        <p className="text-gray-500 text-sm mt-2">
          Ingresa los detalles de la marca
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <InputComponent
              title="ID"
              name="id"
              status={true}
              value={brand.id}
              handleChange={handleChange}
            />
          </div>
          <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <InputComponent
              title="Nombre"
              name="name"
              value={brand.name}
              handleChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Guardar
          </button>
          <button className="text-blue-600 hover:text-blue-800">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandForm;
