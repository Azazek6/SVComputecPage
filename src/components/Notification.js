/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  HiOutlineXCircle,
  HiOutlineCheckCircle,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import { useGlobal } from "../context/GlobalProvider";

const Notification = ({ title, message, status }) => {
  const { openNotification, setOpenNotification } = useGlobal();
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setOpenNotification(false), 300);
  };

  useEffect(() => {
    if (openNotification) {
      setIsVisible(true);
    }
    const timer = setTimeout(handleClose, 8000);
    return () => clearTimeout(timer);
  }, [openNotification]);

  return (
    openNotification && (
      <div
        className={`fixed z-50 top-5 right-5 mt-16 w-full max-w-md bg-white shadow-lg rounded-lg pointer-events-auto border-l-4 ${
          status == "success" ? "border-green-500" : "border-red-500"
        } transform transition-all duration-300 ease-in-out ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="rounded-lg shadow-xs overflow-hidden">
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {status == "success" ? (
                  <HiOutlineCheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <HiOutlineInformationCircle className="h-6 w-6 text-red-500" />
                )}
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm leading-5 font-medium text-gray-900">
                  {title}
                </p>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  {message}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                  onClick={handleClose}
                >
                  <HiOutlineXCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Notification;
