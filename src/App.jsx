import { useState } from "react";
import "./App.css";

export const App = () => {
  const [dots, setDots] = useState([]);
  const [dotsTemporary, setDotsTemporary] = useState([]);

  const handleClick = (e) => {
    const newDot = {
      x: e.pageX,
      y: e.pageY,
    };

    setDots((prev) => [...prev, newDot]);
    setDotsTemporary([]);
  };

  const undo = () => {
    if (dots.length === 0) return;

    const newArray = dots;
    const newDotTemporary = newArray.pop();

    setDots([...newArray]);
    setDotsTemporary((prev) => [...prev, newDotTemporary]);
  };

  const redo = () => {
    if (dotsTemporary.length === 0) return;

    const newArray = dotsTemporary;
    const newDotRedo = newArray.pop();

    setDotsTemporary(newArray);
    setDots((prev) => [...prev, newDotRedo]);
  };

  return (
    <div className="app" onClick={handleClick}>
      <div
        className="buttons"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
      </div>

      {dots.map(({ x, y }, i) => (
        <div key={i} style={{ left: x, top: y }} className="dot"></div>
      ))}
    </div>
  );
};
