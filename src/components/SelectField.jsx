const SelectField = ({ label, options, ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm">{label}</label>
    <select className="h-full rounded w-full min-w-0 truncate" {...props}>
      {options.map((option, i) => (
        <option key={i} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default SelectField;
