import { useState } from "react";
import TableSales from "../../components/Table/TableSales";
import InputComponent from "../../components/InputComponent";
import SelectComponent from "../../components/SelectComponent";
import ModalAddProduct from "../../components/Modal/ModalAddProduct";
import { TotalSale, TotalDiscount, TotalIGV, TotalGrava } from "../../helpers/helper";
import { useGlobal } from "../../context/GlobalProvider";

const title = [
  {
    id: "id",
    name: "Codigo",
  },
  {
    id: "name",
    name: "PRODUCTO",
  },
  {
    id: "amount",
    name: "CANTIDAD",
  },
  {
    id: "price",
    name: "Precio",
  },
  {
    id: "discount",
    name: "Descuento",
  },
  {
    id: "total",
    name: "Importe",
  },
  {
    id: "igv",
    name: "IGV",
  },
];
const dataDocument = [
  {
    id: "FACTURA",
    name: "FACTURA",
  },
  {
    id: "BOLETA DE VENTA",
    name: "BOLETA DE VENTA",
  },
  {
    id: "NOTA DE CRÉDITO",
    name: "NOTA DE CRÉDITO",
  },
  {
    id: "NOTA DE DÉBITO",
    name: "NOTA DE DÉBITO",
  },
];
const dataPayment = [
  {
    id: "CONTADO",
    name: "CONTADO",
  },
  {
    id: "VISA",
    name: "VISA",
  },
  {
    id: "TRASNFERENCIA",
    name: "TRASNFERENCIA",
  },
  {
    id: "YAPE",
    name: "YAPE",
  },
];

const SalesForm = () => {
  const { auth, showModal, productArray } = useGlobal();

  let nowDate = new Date().toISOString().slice(0, 10);

  const [sale, setSale] = useState({
    user: `${auth.name} ${auth.lastnamep} ${auth.lastnamem}`,
    date: nowDate,
    payment: "",
  });

  const handleChange = (e) => {
    setSale({ ...sale, [e.target.name]: e.target.value });
  };

  const openAddProduct = (e) => {
    e.preventDefault();
    showModal();
  };

  return (
    <>
      <ModalAddProduct />
      <div className="bg-white p-8 rounded-md shadow-md w-full">
        <div className="border-b border-gray-200 mb-6 pb-3">
          <h2 className="text-2xl font-semibold">EMITIR VENTA</h2>
          <p className="text-gray-500 text-sm mt-2">Datos de venta</p>
        </div>
        <form>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
              <SelectComponent
                title="Tipo Documento"
                name="document"
                options={dataDocument}
              />
            </div>
            <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
              <InputComponent
                title="Vendedor"
                name="user"
                value={sale.user}
                status={true}
                handleChange={handleChange}
              />
            </div>
            <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
              <InputComponent title="Dirección del cliente" name="address" />
            </div>
            <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
              <InputComponent
                title="Fecha"
                name="date"
                value={sale.date}
                type="date"
                status={true}
                handleChange={handleChange}
              />
            </div>
            <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
              <InputComponent title="Serie" name="serial" status={true} />
            </div>
            <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
              <InputComponent title="Número" name="number" status={true} />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Productos</h3>
            <div className="w-full text-right mb-5">
              <button
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
                onClick={openAddProduct}
              >
                Nuevo producto
              </button>
            </div>
            {/* Tabla donde se guardan los productos */}
            <TableSales data={productArray} title={title} pageSize={4} />
          </div>
          <div className="w-full px-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 mt-2">
            <SelectComponent
              title="Metodo de pago"
              name="payment"
              value={sale.payment}
              options={dataPayment}
              handleChange={handleChange}
            />
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Resumen</h3>
            <div className="flex justify-between mb-2">
              <span>GRAVA:</span>
              <span>S/. {TotalGrava(productArray).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>IGV:</span>
              <span>S/. {TotalIGV(productArray).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>DSCTO:</span>
              <span>S/. {TotalDiscount(productArray).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 font-bold">
              <span>Total:</span>
              <span>S/. {TotalSale(productArray).toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="bg-red-500 text-white px-6 py-2 rounded-md mr-2">
              Cancelar
            </button>
            <button className="bg-green-500 text-white px-6 py-2 rounded-md">
              Emitir
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SalesForm;
