const InputField = ({ label, type, placeholder, className, id, ...props }) => (
  <div className="text-sm flex flex-col">
    <label htmlFor={id}>{label}</label>
    <input 
      type={type} 
      placeholder={placeholder} 
      {...props} 
      id={id} 
      className={`${className} p-2 rounded outline-none border border-gray-300 focus:ring-1 focus:ring-black`} 
    />
  </div>
);

export default InputField;
