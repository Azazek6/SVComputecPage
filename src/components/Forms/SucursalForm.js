import { useState } from "react";
import InputComponent from "../../components/InputComponent";
import Notification from "../../components/Notification";
import { useGlobal } from "../../context/GlobalProvider";

const SucursalForm = () => {
  const { auth, insertSucursal, openNotification, showNotification } =
    useGlobal();

  const [sucursal, setSucursal] = useState({
    id: "0",
    name: "",
    schedule: "",
    location: "",
    address: "",
    phone: "",
    idCompany: auth.idCompany,
  });

  const [loader, setLoader] = useState(false);

  const [message, setMessage] = useState({
    message: "",
    title: "",
    status: "",
  });

  const handleChange = (e) => {
    setSucursal({ ...sucursal, [e.target.name]: e.target.value });
  };

  const clear = () => {
    setSucursal({
      id: "0",
      name: "",
      schedule: "",
      location: "",
      address: "",
      phone: "",
      idCompany: auth.idCompany,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (
      sucursal.name == "" ||
      sucursal.schedule == "" ||
      sucursal.location == "" ||
      sucursal.address == "" ||
      sucursal.phone == "" ||
      sucursal.idCompany == ""
    ) {
      setMessage({
        message: "Faltan Campos a completar",
        title: "FALLO EN LA CREACIÓN",
        status: "error",
      });
      showNotification();
      setLoader(false);
      return;
    }

    try {
      const { status, data } = await insertSucursal(sucursal);
      if (status == 201) {
        clear();
        setMessage({
          message: data.message,
          title: "GUARDADO CON EXITO",
          status: data.status,
        });
        showNotification();
        setLoader(false);
      } else {
        setMessage({
          message: data.message,
          title: "FALLO EN LA CREACIÓN",
          status: data.status,
        });
        showNotification();
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {openNotification && (
        <Notification
          message={message.message}
          title={message.title}
          status={message.status}
        />
      )}
      <div className="bg-white p-8 rounded-md shadow-md w-full">
        <div className="border-b border-gray-200 mb-6 pb-3">
          <h2 className="text-2xl font-semibold">REGISTRAR SUCURSAL</h2>
          <p className="text-gray-500 text-sm mt-2">
            Ingresa los detalles de la sucursal
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
              <InputComponent
                title="ID"
                name="id"
                status={true}
                value={sucursal.id}
                handleChange={handleChange}
              />
            </div>
            <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
              <InputComponent
                title="Nombre"
                name="name"
                value={sucursal.name}
                handleChange={handleChange}
              />
            </div>
            <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
              <InputComponent
                title="Horario de Atención"
                name="schedule"
                value={sucursal.schedule}
                handleChange={handleChange}
              />
            </div>
            <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
              <InputComponent
                title="Locación"
                name="location"
                value={sucursal.location}
                handleChange={handleChange}
              />
            </div>
            <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
              <InputComponent
                title="Dirección"
                name="address"
                value={sucursal.address}
                handleChange={handleChange}
              />
            </div>
            <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
              <InputComponent
                title="Teléfono"
                name="phone"
                type="number"
                value={sucursal.phone}
                handleChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loader ? <div className="ml-2 spinner"></div> : "Guardar"}
            </button>
            <button className="text-blue-600 hover:text-blue-800">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SucursalForm;
