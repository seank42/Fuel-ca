import React from 'react';

// This is defining the Input component
const Input = ({ onChange, type, name, value }) => {
  return (
    <div class="mb-3">
      <label htmlFor={name} class="form-label">
        {name}
      </label>
      <input
        class="form-control"
        onChange={onChange}
        type={type}
        name={name}
        value={value}
      />
    </div>
  );
};

export default Input;
