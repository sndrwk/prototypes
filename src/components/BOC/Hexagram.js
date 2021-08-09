const Hexagram = (props) => {
  const bars = props.results.map((e) => {
    let value = null;
    if (e !== null) {
      value = e > 0 ? "yang" : "yin";
    }
    return <span className={`bar ${value}`} key={Math.random() * 10}></span>;
  });
  return <div className={`hexagram ${props.name}`}>{bars}</div>;
};

export default Hexagram;
