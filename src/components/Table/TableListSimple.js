import { useState } from "react";
import Link from "next/link";

const TableListSimple = ({ title, data, pageSize = 5 }) => {
  const itemsPerPage = pageSize;
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white shadow-md rounded-md w-[100%]">
      <div className="overflow-x-auto min-w-full">
        <table className="w-[100%] divide-y divide-gray-200">
          <thead className="bg-blue-600">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                #
              </th>
              {title.map(({ name }) => (
                <th
                  key={name}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  {name}
                </th>
              ))}
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Aquí deberás realizar un mapeo de tus datos para generar las filas */}
            {currentData?.map((datas, index) => {
              const globalIndex = (currentPage - 1) * pageSize + index + 1;

              return (
                <tr key={datas._id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-base xl:text-base">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {globalIndex}
                        </div>
                      </div>
                    </div>
                  </td>
                  {title?.map((item) => {
                    const value = datas[item.key];
                    return (
                      <td
                        key={item.key}
                        className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-base xl:text-base"
                      >
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {value}
                            </div>
                          </div>
                        </div>
                      </td>
                    );
                  })}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-red-600 hover:text-red-900 mr-4">
                      Editar
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 px-4 py-3 flex items-center justify-between bg-gray-50 border-t border-gray-200 rounded-b-md">
        <button
          className={`px-3 py-1.5 rounded-md text-white ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-800"
          }`}
          onClick={() =>
            setCurrentPage((prev) => (prev === 1 ? prev : prev - 1))
          }
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="text-gray-700">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className={`px-3 py-1.5 rounded-md text-white ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-800"
          }`}
          onClick={() =>
            setCurrentPage((prev) => (prev === totalPages ? prev : prev + 1))
          }
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default TableListSimple;
