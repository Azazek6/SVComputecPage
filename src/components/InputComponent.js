const InputComponent = ({
  title,
  name,
  value,
  status = false,
  handleChange,
  type = "text",
}) => {
  return (
    <>
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-medium mb-2 text-left"
      >
        {title}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          id={name}
          disabled={status}
          value={value}
          onChange={handleChange}
          className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-400 rounded-md py-2 px-4"
        />
      </div>
    </>
  );
};

export default InputComponent;
