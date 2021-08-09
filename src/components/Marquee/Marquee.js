import React, { useRef, useEffect } from "react";

import styles from "./Marquee.module.css";

const Marquee = (props) => {
  const canvasRef = useRef();
  // set up marquee options
  const width = window.innerWidth;
  const height = window.innerHeight;
  const text = props.options.text;
  const font = `${props.options.style} ${height * 2}px ${props.options.font}`;
  const color = props.options.textColor;
  const bg = props.options.bgColor;
  const speed = props.options.speed;

  useEffect(() => {
    let marqueeAnimation;
    const ctx = canvasRef.current.getContext("2d");
    ctx.textBaseline = "ideographic";
    ctx.font = font;
    // calculate width of text
    const textWidth = Math.ceil(ctx.measureText(text + " ").width);
    // build array of text blocks to scroll across the screen
    const textBlocks = [];
    for (let i = 0; i <= Math.ceil((width * 2) / textWidth); i++) {
      textBlocks.push(textWidth * i);
    }

    // recursive animation function
    const draw = () => {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width * 2, height * 2);
      ctx.fillStyle = color;
      // draw each text block
      for (let i = 0; i < textBlocks.length; i++) {
        ctx.fillText(text, textBlocks[i], height * 2);
        // update text block position
        if (textBlocks[i] >= -textWidth) {
          // move text block to the left
          textBlocks[i] -= speed;
        } else {
          // move text block to the end of the row (rightmost position) once it has moved completely off screen
          textBlocks[i] = Math.max(...textBlocks) + textWidth;
        }
      }

      marqueeAnimation = window.requestAnimationFrame(draw);
    };
    draw();

    return () => {
      // stop canvas animation upon component removal
      window.cancelAnimationFrame(marqueeAnimation);
    };
  }, [bg, color, font, height, speed, text, width]);

  return (
    <canvas
      id="marquee"
      className={styles.marquee}
      width={width * 2}
      height={height * 2}
      ref={canvasRef}
      onClick={props.onStopMarquee}
    />
  );
};

export default Marquee;
