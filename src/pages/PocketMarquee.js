import React, { useState } from "react";

import Marquee from "../components/Marquee/Marquee";
import Options from "../components/Marquee/Options";

const PocketMarquee = () => {
  // marquee options
  const [options, setOptions] = useState({
    text: "POCKET MARQUEE",
    font: "'Archivo Black', sans-serif",
    textColor: "#fff",
    bgColor: "#fa1978",
    style: "normal",
    speed: 10,
    running: false,
  });

  // // get/set options from local storage
  // useEffect(() => {
  //   const localOptions = localStorage.getItem("marqueeOptions");
  //   if (localOptions) {
  //     setOptions(JSON.parse(localOptions));
  //   }
  // }, []);

  // // update local storage whenever options change
  // useEffect(() => {
  //   localStorage.setItem("marqueeOptions", JSON.stringify(options));
  // }, [options]);

  const updateOptions = (e) => {
    setOptions((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  const startMarquee = () => {
    setOptions((prevState) => {
      return {
        ...prevState,
        running: true,
      };
    });
  };

  const stopMarquee = () => {
    setOptions((prevState) => {
      return {
        ...prevState,
        running: false,
      };
    });
  };

  return (
    <div className="page-wrap" style={{ backgroundColor: "#a2fe6d" }}>
      {options.running && (
        <Marquee options={options} onStopMarquee={stopMarquee}></Marquee>
      )}
      {!options.running && (
        <Options
          options={options}
          onUpdateOptions={updateOptions}
          onStartMarquee={startMarquee}
        ></Options>
      )}
    </div>
  );
};
export default PocketMarquee;
