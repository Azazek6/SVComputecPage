import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";
import Navegation from "./Navegation";

const DashBoard = ({ children }) => {
  const router = useRouter();
  const [navVisible, setNavVisible] = useState(true);

  const toggleNavVisibility = () => {
    setNavVisible(!navVisible);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <Navegation navVisible={navVisible}/>
      <div
        className={`flex flex-col ${
          navVisible ? "ml-64" : "ml-0"
        } transition-all duration-300`}
      >
        <div className="bg-white shadow-md h-16 flex items-center justify-between px-5">
          <button
            onClick={toggleNavVisibility}
            className="text-gray-700 hover:text-red-600 transition duration-200"
          >
            <FiMenu className="text-2xl" />
          </button>
          <div className="flex items-center">
            <Link href="/dashboard" className="mr-4 text-gray-600">
              Home
            </Link>
            <Link
              href="#"
              className="mr-4 text-gray-600"
              onClick={(e) => {
                e.preventDefault();
                router.push("/");
              }}
            >
              Cerrar Sesi&oacute;n
            </Link>
          </div>
        </div>
        <div className={`flex-grow ${navVisible ? "pl-4" : ""}`}>
          <main className="flex-grow p-8">
            {children}
            {/* Aquí puedes agregar el contenido de tu dashboard */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
