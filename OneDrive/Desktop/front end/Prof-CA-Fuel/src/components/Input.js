const Input = ({ onChange, type, name, value }) => {
    return (
      <label className="flex flex-col capitalize" htmlFor={name}>
        {name}
        <input
          className="border border-black rounded px-3 py-2 mt-2"
          onChange={onChange}
          type={type}
          name={name}
          value={value}
        />
      </label>
    );
  };
  
  export default Input;
  