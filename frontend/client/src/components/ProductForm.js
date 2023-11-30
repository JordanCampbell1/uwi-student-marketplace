// ProductDescriptionForm.js
import React from 'react';
import InputField from './InputField'
import SelectField from './SelectField';

const ProductDescriptionForm = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Product title" name="title" type="text" placeholder="Mercedes S Class suspension" />
        <SelectField label="Type" name="type" options={['AMG Suspension', 'Standard Suspension']} />
        <InputField label="Product sub title" name="subtitle" type="text" />
        <InputField label="Year" name="year" type="number" />
        <InputField label="Product description" name="description" type="textarea" />
        <SelectField label="Side" name="side" options={['Left', 'Right', 'Both']} />
        <SelectField label="State" name="state" options={['New', 'Used']} />
        {/* Add more fields as necessary */}
      </form>
    </div>
  );
};

export default ProductDescriptionForm;

