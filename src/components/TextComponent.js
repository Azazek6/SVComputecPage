const TextComponent = ({
  title,
  name,
  value,
  width,
  height,
  status = false,
  handleChange,
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
        <textarea
          name={name}
          id={name}
          onChange={handleChange}
          cols={width}
          value={value}
          rows={height}
          className="focus:ring-blue-500 resize-none focus:border-blue-500 block w-full sm:text-sm border border-gray-400 rounded-md py-2 px-4"
        />
      </div>
    </>
  );
};

export default TextComponent;
