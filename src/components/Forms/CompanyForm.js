/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios"
import InputComponent from "../../components/InputComponent";
import { useGlobal } from "../../context/GlobalProvider";
import { connectURL } from "../../helpers/configuration";

const CompanyForm = () => {
  const {
    auth,
    fecthProductInsert,
  } = useGlobal();

  const [company, setCompany] = useState({
    id: "",
    ruc: "",
    companyName: "",
    address: "",
    province: "",
    district: "",
    department: "",
    phone: "",
    logo: "",
    status: "",
    date: "",
  });

  const [product, setProduct] = useState({
    id: "0",
    name: "",
    description: "",
    brand: "",
    category: "",
    stock: "",
    price: "",
    idCompany: auth.idCompany,
  });

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const clear = () => {
    setProduct({
      id: "0",
      name: "",
      description: "",
      brand: "",
      category: "",
      stock: "",
      price: "",
      idCompany: auth.idCompany,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      product.name == "" ||
      product.description == "" ||
      product.brand == "" ||
      product.category == "" ||
      product.stock == "" ||
      product.price == "" ||
      product.idCompany == ""
    ) {
      alert("Faltan Campos");
      return;
    }
    try {
      const { status, data } = await fecthProductInsert(product);
      if (status == 201) {
        clear();
        alert(`${data.message}`);
      } else {
        alert(`${data.message}`);
      }
    } catch (error) {
      console.log();
    }
  };

  useEffect(() => {
    const loadCompany = async ()=>{
      try {
        const {status, data} = await axios.get(`${connectURL}/configuration/company/${auth.idCompany}`)
        if(status == 200){
          setCompany(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    loadCompany()
  }, []);

  return (
    <div className="bg-white p-8 rounded-md shadow-md w-full">
      <div className="border-b border-gray-200 mb-6 pb-3">
        <h2 className="text-2xl font-semibold">GESTI&Oacute;N DE EMPRESA</h2>
        <p className="text-gray-500 text-sm mt-2">
          Visualiza o modifica tus datos
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <InputComponent
              title="RUC"
              name="ruc"
              value={company.ruc}
              handleChange={handleChange}
            />
          </div>
          <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <InputComponent
              title="Nombre de Empresa"
              name="companyName"
              value={company.companyName}
              handleChange={handleChange}
            />
          </div>
          <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <InputComponent
              title="Dirección"
              name="address"
              value={company.address}
              handleChange={handleChange}
            />
          </div>
          <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <InputComponent
              title="Teléfono"
              name="phone"
              value={company.phone}
              handleChange={handleChange}
            />
          </div>
          <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <InputComponent
              title="Provincia"
              name="province"
              value={company.province}
              handleChange={handleChange}
            />
          </div>
          <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <InputComponent
              title="Distrito"
              name="district"
              value={company.district}
              handleChange={handleChange}
            />
          </div>
          <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <InputComponent
              title="Departamento"
              name="department"
              value={company.department}
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
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;
