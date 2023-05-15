import { useState } from "react";
import Link from "next/link";
import Navegation from "../sample/navegation.json";
import { FiChevronDown } from "react-icons/fi";
import { useGlobal } from "../context/GlobalProvider";

const NavegationData = () => {
  const {auth} = useGlobal()

  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = (id) => {
    setNavOpen((prevState) => {
      return { ...prevState, [id]: !prevState[id] };
    });
  };

  return (
    <nav className="divide-y divide-gray-200 overflow-y-auto max-h-screen ">
      {Navegation.map(({ moduleName, module }, index) => (
        <div key={index}>
          <p className="w-full text-right px-5 text-xs mb-3 mt-3 pt-3 text-[#aab8c0]">
            {moduleName}
          </p>
          {module.map(({ name, subItem, roles }, indexK) => {

            // Verificar si el rol del usuario está incluido en la lista de roles permitidos
            if (roles && !roles.includes(auth.rol)) {
              return null;
            }

            const uniqueId = `${index}-${indexK}`;
            return (
              <div className="p-4" key={uniqueId}>
                <button
                  onClick={() => toggleNav(uniqueId)}
                  className="font-medium w-full text-left flex items-center"
                >
                  {name}
                  <FiChevronDown className="ml-auto" />
                </button>
                {navOpen[uniqueId] && (
                  <ul className="mt-2">
                    {/* Opciones para el menú desplegable  */}
                    {subItem.map(({ name, path }, index) => (
                      <div key={index}>
                        <li className="py-1">
                          <Link
                            href={path}
                            className="text-gray-700 text-sm bg-gray-100 block p-2 text-right hover:text-red-600 transition duration-200"
                          >
                            {name}
                          </Link>
                        </li>
                      </div>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </nav>
  );
};

export default NavegationData;
