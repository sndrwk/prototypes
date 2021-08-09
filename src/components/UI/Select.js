const Select = (props) => {
  const options = props.options.map((option) => {
    return (
      <option key={option.id} value={option.value}>
        {option.option}
      </option>
    );
  });
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <select id={props.id} onChange={props.onChange} value={props.value}>
        {options}
      </select>
    </div>
  );
};

export default Select;
