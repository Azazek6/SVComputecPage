import { useState } from "react";
import { useGlobal } from "../../context/GlobalProvider";
import Notification from "../Notification";
import InputComponent from "../../components/InputComponent";

const BrandForm = () => {
  const { auth, insertBrand, openNotification, showNotification } = useGlobal();

  const [brand, setBrand] = useState({
    id: "0",
    name: "",
    idCompany: auth.idCompany,
  });

  const [loader, setLoader] = useState(false);

  const [message, setMessage] = useState({
    message: "",
    title: "",
    status: "",
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
    setLoader(true);
    if (brand.name == "" || brand.idCompany == "") {
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
      const { status, data } = await insertBrand(brand);
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
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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

export default BrandForm;
