import React, { useState } from "react";

type Props = {
  setMode: React.Dispatch<React.SetStateAction<string>>;
};

const Options = ({ setMode }: Props) => {
  return (
    <div>
      <button onClick={() => setMode("text")}>Text</button>
      <button onClick={() => setMode("drawing")}>Drawing</button>
      <button onClick={() => setMode("straight-line")}>Straight Line</button>
      <button onClick={() => setMode("rectangle")}>Rectangle</button>
      <button onClick={() => setMode("square")}>Square</button>
      <button onClick={() => setMode("arrow")}>Arrow</button>
    </div>
  );
};

export default Options;
