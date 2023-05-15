import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";
import { connectURL } from "../helpers/configuration";

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useApps must be used within a GlobalContextProvider");
  }
  return context;
};

export const GlobalContextProvider = ({ children }) => {
  //Estados
  const [auth, setAuth] = useState({
    _id: "64323bde8b676e88fe412350",
    document: "46311880",
    name: "ERICK",
    lastnamep: "MENDEZ",
    lastnamem: "OBANDO",
    username: "46311880",
    password: "46311880",
    rol: "ADMINISTRADOR",
    idSucursal: "64323aa8a894d22d072fa1b3",
    idCompany: "643225d2b48bc28f4f03ac00",
  });
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [sucursal, setSucursal] = useState([]);
  const [product, setProduct] = useState([]);
  // Gnerales
  const [openMessage, setOpenMessage] = useState(false)
  const [productArray, setProductArray] = useState([])

  //Funciones auth
  const signIn = async () => {
    setAuth({
      _id: "64323bde8b676e88fe412350",
      document: "46311880",
      name: "ERICK",
      lastnamep: "MENDEZ",
      lastnamem: "OBANDO",
      username: "46311880",
      password: "46311880",
      rol: "ADMINISTRADOR",
      idSucursal: "64323aa8a894d22d072fa1b3",
      idCompany: "643225d2b48bc28f4f03ac00",
    });
  };

  //Funciones fecth
  //Marca
  const fecthBrand = async (company) => {
    try {
      const { data } = await axios.get(
        `${connectURL}/configuration/brands/${company}`
      );
      setBrand(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fecthBrandInsert = async (brand) => {
    return axios.post(`${connectURL}/configuration/brands`, brand);
  };
  //Categoria
  const fecthCategory = async (company) => {
    try {
      const { data } = await axios.get(
        `${connectURL}/configuration/categories/${company}`
      );
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fecthCategoryInsert = async (category) => {
    return axios.post(`${connectURL}/configuration/categories`, category);
  };
  //Sucursal
  const fecthSucursal = async (company) => {
    try {
      const { data } = await axios.get(
        `${connectURL}/configuration/branchs/${company}`
      );
      setSucursal(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fecthSucursalInsert = async (sucursal) => {
    return axios.post(`${connectURL}/configuration/branchs`, sucursal);
  };
  //Producto
  const fecthProduct = async (company) => {
    try {
      const { data } = await axios.get(`${connectURL}/store/products/${company}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fecthProductInsert = async (product) => {
    return axios.post(`${connectURL}/store/products`, product);
  };

  // Generales
  const showModal = () => {
    setOpenMessage(!openMessage);
  };
  const addProduct = (item)=>{
    setProductArray([...productArray, item])
  }
  const removeProductsArray = (id) => {
    const removeProducts = productArray.filter((items) => {
      return id != items.id;
    });
    setProductArray(removeProducts);
  };
  return (
    <GlobalContext.Provider
      value={{
        auth,
        brand,
        category,
        sucursal,
        product,
        openMessage,
        productArray,
        signIn,
        fecthBrand,
        fecthBrandInsert,
        fecthCategory,
        fecthCategoryInsert,
        fecthSucursal,
        fecthSucursalInsert,
        fecthProduct,
        fecthProductInsert,
        showModal,
        addProduct,
        removeProductsArray,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
