import React, { useState } from "react";
import Card from "./Card";
import {initalState} from "./data";

function Carousel() {

  const [cards, setCards] = useState(initalState);
  console.log("initial", cards.map((f) => f.pos));

  const handleLeftClick = (isLeft) => {
    const prevState = [...cards];
    // find next inactive card index - top
    const nextCardIdx = prevState
      .filter((ft) => ft.active === true)
      .sort((a, b) => (a.pos > b.pos ? 1 : b.pos > a.pos ? -1 : 0))[0].idx;
    console.log("next",nextCardIdx);
    // reset
    prevState.find((f) => f.active === false).active = true;
    // update
    prevState.find((f) => f.idx === nextCardIdx).active = false;
    // maximize pos
    console.log(prevState.map((f) => f.pos))
    console.log("before",prevState.find((f) => f.idx === nextCardIdx).pos);
  
    //posの最大値を配列から探して、nextCardIdxを最大値より1大きい値にする = 
    prevState.find((f) => f.idx === nextCardIdx).pos =
      Math.max.apply(
        null,
        prevState.map((o) => {
          return o.pos;
        })
      ) + 1;
      console.log("after",prevState.find((f) => f.idx === nextCardIdx).pos);
    // update state
    setCards(prevState);
  };

  const handleRightClick = () => {
    const prevState = [...cards];
    // find next inactive card index - bottom
    const nextCardIdx = prevState
      .filter((ft) => ft.active === true)
      .sort((a, b) => (a.pos > b.pos ? 1 : b.pos > a.pos ? -1 : 0))
      .pop(1).idx;
      console.log("next",nextCardIdx);
      console.log(prevState.map((f) => f.pos))
    // minimize pos
    console.log("before",prevState.find((f) => f.active === false).pos);
    prevState.find((f) => f.active === false).pos =
      Math.min.apply(
        null,
        prevState.map(function (o) {
          return o.pos;
        })
      ) - 1;
      console.log("after",prevState.find((f) => f.active === false).pos);
    // reset
    prevState.find((f) => f.active === false).active = true;
    // update
    prevState.find((f) => f.idx === nextCardIdx).active = false;

    // update state
    setCards(prevState);
  };

  return (
    <>
      <div
        className="text-xl md:text-5xl cursor-pointer"
        onClick={() => handleLeftClick()}
      >
        {"<"}
      </div>
      {cards
        .filter((f) => f.active === true)
        .sort((a, b) => (a.pos > b.pos ? 1 : b.pos > a.pos ? -1 : 0))
        .map((card, index) => (
          <Card key={index} prop={card.text} />
        ))}
      <div
        className="text-xl md:text-5xl cursor-pointer"
        onClick={() => handleRightClick()}
      >
        {">"}
      </div>
    </>
  );
}

export default Carousel;
