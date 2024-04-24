import React from 'react';

// This is defining the Form component
const Form = ({ onSubmit, children }) => {
  // This is returning a form with attributes and styling
  return (
    <form
      class="d-flex flex-column align-items-center gap-4 max-w-2xl mx-auto pb-4 pt-4 border border-2 border-secondary rounded"
      onSubmit={onSubmit}
      method="POST"
    >
      {children} {/* This is rendering the child components within the form */}
    </form>
  );
};

export default Form;
