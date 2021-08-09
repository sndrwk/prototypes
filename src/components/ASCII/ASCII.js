import React, {useRef} from "react";

import styles from "./ASCII.module.css";

const ASCII = () => {

  const bug = useRef();


  return (
    <pre className={styles.ascii}>
      <p>　　　　　　　　<span className={`${styles.move} ${styles.orbit}`} ref={bug}>8～</span></p>
      <p>　　　　　　　</p>
      <p>　　　　　　　</p>
      <p>　　　　　　　　　　　　　　<span className={`${styles.move} ${styles.orbitReverse}`}>～8</span></p>
      <p>　　　　　　　</p>
      <p>　　　　　　<span className={`${styles.move} ${styles.wiggle}`}>（○）</span>　　　　　<span className={`${styles.move} ${styles.wiggle}`}>（○）</span>　　　　　<span className={`${styles.move} ${styles.wiggle}`}>（○）</span></p>
      <p>　　　　　　ヽ|〃　　　ヽ|〃　　ヽ|〃</p>
      <p>"''""""''""""""''"""""""''"""""""""""''"""</p>
    </pre>
  );
}
export default ASCII;