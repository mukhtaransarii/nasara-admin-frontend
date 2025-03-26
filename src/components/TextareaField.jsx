const TextareaField = ({ label, ...props }) => (
  <div className="text-sm">
    <label>{label}</label>
    <textarea rows="5" className="w-full p-2 border border-gray-300 resize-none" {...props}></textarea>
  </div>
);

export default TextareaField;
