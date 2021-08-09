import React from "react";

import Select from "../UI/Select";
import Button from "../UI/Button";

import styles from "./Options.module.css";

const Options = (props) => {
  const submitForm = (e) => {
    e.preventDefault();
    props.onStartMarquee();
  };

  const colors = [
    { option: "white", value: "#fff", id: "c1" },
    { option: "pink", value: "#fa1978", id: "c2" },
    { option: "green", value: "#a2fe6d", id: "c3" },
    { option: "blue", value: "#0000ff", id: "c4" },
    { option: "purple", value: "#e638ff", id: "c5" },
    { option: "black", value: "#000", id: "c6" },
  ];

  // prevent text and bg colors from being the same
  const textColors = colors.filter((color) => {
    return color.value !== props.options.bgColor;
  });

  const bgColors = colors.filter((color) => {
    return color.value !== props.options.textColor;
  });

  return (
    <form className={styles.options} onSubmit={submitForm}>
      <div>
        <input
          id="text"
          type="text"
          onChange={props.onUpdateOptions}
          value={props.options.text}
          style={{
            fontFamily: props.options.font,
            color: props.options.textColor,
            backgroundColor: props.options.bgColor,
            fontStyle: props.options.style,
          }}
        />
      </div>
      <div className={styles.dropdowns}>
        <Select
          id="font"
          label="font"
          onChange={props.onUpdateOptions}
          value={props.options.font}
          options={[
            {
              option: "Archivo Black",
              value: "'Archivo Black', sans-serif",
              id: "f4",
            },
            {
              option: "Noto Sans JP",
              value: "'Noto Sans JP', sans-serif",
              id: "f2",
            },
            {
              option: "IBM Plex Mono",
              value: "'IBM Plex Mono', monospace",
              id: "f1",
            },
            {
              option: "Playfair Display",
              value: "Playfair Display, serif",
              id: "f3",
            },
          ]}
        />
        <Select
          id="style"
          label="style"
          onChange={props.onUpdateOptions}
          value={props.options.style}
          options={[
            {
              option: "normal",
              value: "normal",
              id: "s1",
            },
            {
              option: "italic",
              value: "italic",
              id: "s2",
            },
          ]}
        />
        <Select
          id="textColor"
          label="text color"
          onChange={props.onUpdateOptions}
          value={props.options.textColor}
          options={textColors}
        />
        <Select
          id="bgColor"
          label="bg color"
          onChange={props.onUpdateOptions}
          value={props.options.bgColor}
          options={bgColors}
        />
        <Select
          id="speed"
          label="speed"
          onChange={props.onUpdateOptions}
          value={props.options.speed}
          options={[
            {
              option: "slow",
              value: "10",
              id: "sp1",
            },
            {
              option: "regular",
              value: "20",
              id: "sp2",
            },
            {
              option: "fast",
              value: "25",
              id: "sp3",
            },
          ]}
        />
      </div>
      <div className={styles.submit}>
        <Button type="submit">START!</Button>
      </div>
    </form>
  );
};

export default Options;
