"use client";

import React, { useState } from "react";
import CanvasComponent from "./components/Canvas";

type Props = {};

const page = (props: Props) => {
  const [mode, setMode] = useState<string>("draw");

  return (
    <div>
      <button onClick={() => setMode("draw")}>Draw</button>
      <button onClick={() => setMode("text")}>Text</button>
      <CanvasComponent mode={mode} />{" "}
    </div>
  );
};

export default page;
