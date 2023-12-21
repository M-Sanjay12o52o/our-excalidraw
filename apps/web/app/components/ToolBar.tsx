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
    </div>
  );
};

export default Toolbar;
