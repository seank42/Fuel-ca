import React from 'react';

// This is defining the Input component
const Input = ({ onChange, type, name, value }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      <input
        className="form-control"
        onChange={onChange}
        type={type}
        name={name}
        value={value}
      />
    </div>
  );
};

export default Input;
