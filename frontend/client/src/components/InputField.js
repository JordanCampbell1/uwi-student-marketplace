import React, { useState } from 'react';

const InputField = ({ label, name, type, placeholder, isCurrency, onChange, width }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Function to format the input value as currency for display
  const formatCurrencyDisplay = (value) => {
    if (!isCurrency || !value) return value;

    const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')).toFixed(2);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(numericValue);
  };

  // Function to handle input change
  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange({ ...e, target: { ...e.target, value: newValue } });
    }
  };

  // Handle focus on the input field
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Handle blur (focus loss) on the input field
  const handleBlur = () => {
    setIsFocused(false);
    const formattedValue = formatCurrencyDisplay(inputValue);
    setInputValue(formattedValue);
    if (onChange) {
      onChange({ target: { name, value: formattedValue } });
    }
  };

  // Determine the width class based on the prop
  const widthClass = width ? width : 'w-full';

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
          className={`p-2 mt-1 block ${widthClass} rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          placeholder={placeholder}
          onChange={onChange}
        ></textarea>
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          className={`mt-1 block ${widthClass} rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-2`}
          placeholder={placeholder}
          value={isCurrency && !isFocused ? formatCurrencyDisplay(inputValue) : inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}
    </div>
  );
};

export default InputField;
