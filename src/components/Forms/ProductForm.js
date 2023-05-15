import { useState, useEffect } from "react";
import InputComponent from "../../components/InputComponent";
import TextComponent from "../../components/TextComponent";
import SelectComponent from "../../components/SelectComponent";
import { useGlobal } from "../../context/GlobalProvider";

const ProductForm = () => {
  const {
    auth,
    brand,
    category,
    fecthCategory,
    fecthBrand,
    fecthProductInsert,
  } = useGlobal();
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
    setProduct({ ...product, [e.target.name]: e.target.value });
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
    fecthBrand(auth.idCompany);
  }, [auth.idCompany]);
  useEffect(() => {
    fecthCategory(auth.idCompany);
  }, [auth.idCompany]);

  return (
    <div className="bg-white p-8 rounded-md shadow-md w-full">
      <div className="border-b border-gray-200 mb-6 pb-3">
        <h2 className="text-2xl font-semibold">REGISTRAR PRODUCTO</h2>
        <p className="text-gray-500 text-sm mt-2">
          Ingresa los datos del producto
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <SelectComponent
              title="Marca"
              name="brand"
              options={brand}
              handleChange={handleChange}
            />
          </div>
          <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <SelectComponent
              title="Categoria"
              name="category"
              options={category}
              handleChange={handleChange}
            />
          </div>
          <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <InputComponent
              title="Nombre Comercial"
              name="name"
              value={product.name}
              handleChange={handleChange}
            />
          </div>
          <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <InputComponent
              title="Stock Inicial"
              name="stock"
              type="number"
              value={product.stock}
              handleChange={handleChange}
            />
          </div>
          <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <InputComponent
              title="Precio"
              name="price"
              type="number"
              value={product.price}
              handleChange={handleChange}
            />
          </div>
          <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <TextComponent
              title="Descripcion del Producto"
              name="description"
              value={product.description}
              width="5"
              height="3"
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

export default ProductForm;
