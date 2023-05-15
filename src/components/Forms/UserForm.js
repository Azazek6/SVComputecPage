import { useState } from "react";
import InputComponent from "../../components/InputComponent";
import SelectComponent from "../../components/SelectComponent";

let options = [
  {
    _id: 1,
    name: "SUCURSAL 1",
  },
  {
    _id: 2,
    name: "SUCURSAL 2",
  },
];

let rols = [
  {
    _id: "ADMINISTRADOR",
    name: "ADMINISTRADOR",
  },
  {
    _id: "PERSONAL",
    name: "PERSONAL",
  },
];

const UserForm = () => {
  const [user, setUser] = useState({
    id: "0",
    document: "",
    name: "",
    lastnamep: "",
    lastnamem: "",
    username: "",
    password: "",
    idSucursal: "",
    idCompany: "",
    rol: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <div className="bg-white p-8 rounded-md shadow-md w-full">
      <div className="border-b border-gray-200 mb-6 pb-3">
        <h2 className="text-2xl font-semibold">REGISTRAR USUARIO</h2>
        <p className="text-gray-500 text-sm mt-2">
          Ingresa los datos del trabajador
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <InputComponent
              title="DNI"
              name="document"
              value={user.document}
              handleChange={handleChange}
            />
          </div>
          <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <InputComponent
              title="Nombre"
              name="name"
              value={user.name}
              handleChange={handleChange}
            />
          </div>
          <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <InputComponent
              title="AP. PATERNO"
              name="lastnamep"
              value={user.lastnamep}
              handleChange={handleChange}
            />
          </div>
          <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <InputComponent
              title="AP. MATERNO"
              name="lastnamem"
              value={user.lastnamem}
              handleChange={handleChange}
            />
          </div>
        </div>

        <div className="border-b border-gray-200 mb-6 pb-3">
          <p className="text-gray-500 text-sm mt-2">
            Ingresa los datos de usuario
          </p>
        </div>

        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <InputComponent
              title="Nombre de Usuario"
              name="username"
              status={true}
              value={user.document}
              handleChange={handleChange}
            />
          </div>
          <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <SelectComponent
              title="Sucursal"
              name="idSucursal"
              options={options}
              handleChange={handleChange}
            />
          </div>
          <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <SelectComponent
              title="Perfil"
              name="rol"
              options={rols}
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

export default UserForm;
