/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import AutoCompleteComponent from "../../components/AutoCompleteComponent";
import InputComponent from "../../components/InputComponent";
import { useGlobal } from "../../context/GlobalProvider";

const ModalAddProduct = () => {
  const { auth, openMessage, showModal, fecthProduct, product, addProduct } =
    useGlobal();
  const [open, setOpen] = useState(true);

  const [productModal, setProductModal] = useState({
    id: "",
    name: "",
    amount: "",
    stock: "",
    price: "",
    total: "",
    discount: 0,
    igv: "",
  });

  const cancelButtonRef = useRef(null);

  const handleChange = (e) => {
    setProductModal({ ...productModal, [e.target.name]: e.target.value });
  };

  const handleSuggestionSelect = (suggestion) => {
    setProductModal({ ...productModal, name: suggestion.name });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      productModal.name === "" ||
      productModal.amount === "" ||
      productModal.stock === "" ||
      productModal.price === "" ||
      productModal.igv === ""
    ) {
      alert("sin datos");
      return;
    }

    try {
      productModal.total =
        productModal.discount != 0
          ? productModal.amount * productModal.price - productModal.discount
          : productModal.amount * productModal.price;
      addProduct(productModal);
      setProductModal({
        id: "",
        name: "",
        amount: "",
        stock: "",
        price: "",
        total: "",
        discount: 0,
        igv: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fecthProduct(auth.idCompany);
  }, []);

  useEffect(() => {
    if (productModal.name !== "") {
      let data = product.filter(({ name }) => {
        return name === productModal.name;
      });
      if (data.length !== 0) {
        setProductModal((prevState) => ({
          ...prevState,
          id: data[0]._id,
          price: data[0].price,
          stock: data[0].stock,
          igv: data[0].igv,
        }));
      }
    }
  }, [productModal.name, product]);

  return (
    <Transition.Root show={openMessage} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="bg-gray-800 bg-opacity-50 fixed inset-0 transition-opacity" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative w-full sm:max-w-4xl px-4 py-8 bg-white shadow-lg rounded-lg overflow-hidden">
              <Dialog.Title
                as="h3"
                className="text-2xl font-semibold text-gray-900 mb-4 text-left"
              >
                A&ntilde;ade tu producto
              </Dialog.Title>
              <form>
                <AutoCompleteComponent
                  data={product}
                  onSelect={handleSuggestionSelect}
                  inputName="name"
                  inputValue={productModal.name}
                  onInputChange={handleChange}
                />
                <div className="flex flex-wrap -mx-2 mt-5">
                  <div className="w-full sm:w-1/3 px-2">
                    <InputComponent
                      title="Precio"
                      name="price"
                      value={productModal.price}
                      type="number"
                      handleChange={handleChange}
                    />
                  </div>
                  <div className="w-full sm:w-1/3 px-2">
                    <InputComponent
                      title="Stock"
                      name="stock"
                      type="number"
                      value={productModal.stock}
                      status={true}
                      handleChange={handleChange}
                    />
                  </div>
                  <div className="w-full sm:w-1/3 px-2">
                    <InputComponent
                      title="IGV"
                      name="igv"
                      value={productModal.igv}
                      type="number"
                      status={true}
                      handleChange={handleChange}
                    />
                  </div>
                  <div className="w-full sm:w-1/3 px-2">
                    <InputComponent
                      title="Descuento"
                      value={productModal.discount}
                      name="discount"
                      type="number"
                      handleChange={handleChange}
                    />
                  </div>
                  <div className="w-full sm:w-1/3 px-2">
                    <InputComponent
                      title="Cantidad"
                      name="amount"
                      value={productModal.amount}
                      type="number"
                      handleChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-5">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={(e) => {
                      e.preventDefault();
                      showModal();
                    }}
                    ref={cancelButtonRef}
                  >
                    Volver
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={handleSubmit}
                  >
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalAddProduct;
