"use client";

import React, { useState } from "react";
import CanvasComponent from "./components/Canvas";
import Options from "./components/Options";

type Props = {};

const page = (props: Props) => {
  const [mode, setMode] = useState<string>("");

  return (
    <div>
      <Options setMode={setMode} />
      <CanvasComponent />
    </div>
  );
};

export default page;
