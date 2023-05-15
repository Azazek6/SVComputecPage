import { FiUser } from "react-icons/fi";
import NavegationData from "./NavegationData";
import { useGlobal } from "../context/GlobalProvider";

const Navegation = ({ navVisible }) => {
  const {auth} = useGlobal()

  return (
    <aside
      className={`bg-white shadow-md w-64 min-h-screen fixed nav-transition ${
        navVisible ? "" : "-translate-x-full md:-translate-x-64"
      }`}
    >
      <div className="p-4 bg-blue-600">
        <div className="flex items-center gap-10">
          <h2 className="font-bold text-white text-xs">{auth.name} {auth.lastnamep} {auth.lastnamem}</h2>
          <FiUser className="text-white mr-2" />
        </div>
      </div>
      <div className="text-xs text-black text-center mt-3 mb-3">
      {auth.rol}
      </div>
      <NavegationData />
    </aside>
  );
};

export default Navegation;
