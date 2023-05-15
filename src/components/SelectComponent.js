import React from "react";

const SelectComponent = ({
  id = false,
  title,
  name,
  value,
  status = false,
  handleChange,
  options = [],
}) => {
  return (
    <>
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-medium mb-2"
      >
        {title}
      </label>
      <div className="relative">
        <select
          name={name}
          id={name}
          onChange={handleChange}
          className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-400 rounded-md py-2 px-4"
        >
          <option value="">Seleccion</option>
          {options.length != 0 && (
            <>
              {options.map(({ name, _id }) => (
                <option key={_id} value={id ? _id : name}>
                  {name}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
    </>
  );
};

export default SelectComponent;
