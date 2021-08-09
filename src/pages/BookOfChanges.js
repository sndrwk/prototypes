import { useState, useCallback } from "react";

import Button from "../components/UI/Button";
import Coins from "../components/BOC/Coins";
import Hexagram from "../components/BOC/Hexagram";
import Description from "../components/BOC/Description";

import "../components/BOC/BOC.css";

const BookOfChanges = () => {
  const [intro, setIntro] = useState(true);
  const [presentHex, setPresentHex] = useState(Array(6).fill(null));
  const [futureHex, setFutureHex] = useState(Array(6).fill(null));

  const startHandler = () => {
    setIntro(!intro);
  };

  const throwHandler = useCallback((heads) => {
    let presentGram = 0;
    let futureGram = 0;
    switch (heads) {
      case 0:
        presentGram = 0;
        futureGram = 1;
        break;
      case 1:
        presentGram = 0;
        futureGram = 0;
        break;
      case 2:
        presentGram = 1;
        futureGram = 1;
        break;
      case 3:
        presentGram = 1;
        futureGram = 0;
        break;
      default:
        break;
    }
    setPresentHex((presentHex) => {
      const newPresentHex = [...presentHex];
      for (let i = 5; i >= 0; i--) {
        if (newPresentHex[i] === null) {
          newPresentHex[i] = presentGram;
          return newPresentHex;
        }
      }
    });
    setFutureHex((futureHex) => {
      const newFutureHex = [...futureHex];
      for (let i = 5; i >= 0; i--) {
        if (newFutureHex[i] === null) {
          newFutureHex[i] = futureGram;
          return newFutureHex;
        }
      }
    });
  }, []);

  return (
    <div className="page-wrap" style={{ backgroundColor: "#000" }}>
      <div>
        <Coins onThrow={throwHandler} />
        <div className="hex-wrapper">
          <Hexagram name="presentHex" results={presentHex} />
          <span>changing to</span>
          <Hexagram name="futureHex" results={futureHex} />
        </div>
        {!presentHex.includes(null) && !futureHex.includes(null) && (
          <div className="description">
            <Description name="present" results={presentHex} />
            <Description name="future" results={futureHex} />
          </div>
        )}
        {intro && (
          <div className="intro-wrap">
            <div className="intro">
              <p>
                the i-ching, also known as the book of changes, is an ancient
                chinese divination manual that dates back to 1000-750 BC.
              </p>
              <p>
                keep a question for the oracle in mind while throwing these
                virtual coins, and it'll point you to a set of texts that will
                hopefully give you a greater understanding of your present and
                future!
              </p>
            </div>
            <Button className="boc-button" onClick={startHandler}>
              BEGIN
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookOfChanges;
