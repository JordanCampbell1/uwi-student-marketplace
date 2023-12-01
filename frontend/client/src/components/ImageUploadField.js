import React from 'react';

const ImageUploadField = ({ label, name, onChange, multiple }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-2 font-semibold text-gray-700">{label}</label>
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col rounded-lg border-2 border-dashed border-gray-300 w-full h-32 p-5 group text-center">
          <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h10M7 16h10M7 20h10M7 4h10" />
            </svg>
            <p className="lowercase text-sm text-gray-400 group-hover:text-gray-600 pt-1 tracking-wider">Select a photo</p>
          </div>
          <input type='file' className="hidden" name={name} accept="image/*" onChange={onChange} multiple={multiple} />
        </label>
      </div>
    </div>
  );
};

export default ImageUploadField;
