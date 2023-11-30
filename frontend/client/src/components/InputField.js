// InputField.js
const InputField = ({ label, name, type, placeholder }) => {
    return (
      <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder={placeholder}
          ></textarea>
        ) : (
          <input
            type={type}
            name={name}
            id={name}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder={placeholder}
          />
        )}
      </div>
    );
  };
  export default InputField