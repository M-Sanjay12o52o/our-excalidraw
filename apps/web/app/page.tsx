"use client";

import React, { useState } from "react";
import CanvasComponent from "./components/Canvas";
import Toolbar from "./components/ToolBar";

type Props = {};

const page = (props: Props) => {
  const [mode, setMode] = useState<string>("draw");

  return (
    <div>
      <Toolbar setMode={setMode} />
      <CanvasComponent mode={mode} />
    </div>
  );
};

export default page;
