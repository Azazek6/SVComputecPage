import { useState } from "react";

const AutoCompleteComponent = ({
  data,
  onSelect,
  inputName,
  inputValue,
  onInputChange,
}) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    onInputChange(e);

    if (value.length >= 2) {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onSelect(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="flex flex-col items-center border border-gray-300 rounded-md w-[100%]">
      <input
        type="text"
        placeholder="Buscar"
        name={inputName}
        value={inputValue}
        onChange={handleNameChange}
        className="w-full rounded-l-md py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
      />
      {suggestions.length > 0 && (
        <ul className="w-full bg-white shadow-md max-h-64 overflow-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion._id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 hover:bg-blue-100 cursor-pointer"
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteComponent;
