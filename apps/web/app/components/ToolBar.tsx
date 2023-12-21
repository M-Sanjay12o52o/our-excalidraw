import React from "react";

interface ToolbarProps {
  setMode: React.Dispatch<React.SetStateAction<string>>;
}

const Toolbar: React.FC<ToolbarProps> = ({ setMode }) => {
  const handleModeChange = (mode: string) => {
    setMode(mode);
  };

  return (
    <div>
      <button onClick={() => handleModeChange("draw")}>Draw</button>
      <button onClick={() => handleModeChange("text")}>Text</button>
      <button onClick={() => handleModeChange("rectangle")}>Rectangle</button>
      <button onClick={() => handleModeChange("square")}>Square</button>
      <button onClick={() => handleModeChange("arrow")}>Arrow</button>
      <button onClick={() => handleModeChange("dottedRect")}>
        Dotted Rectangle
      </button>
      <button onClick={() => handleModeChange("dottedSquare")}>
        Dotted Square
      </button>
    </div>
  );
};

export default Toolbar;
