import React from "react";
import DottedRect from "./DottedRect";

interface DottedSquareProps {
  x: number;
  y: number;
  size: number;
}

const DottedSquare: React.FC<DottedSquareProps> = ({ x, y, size }) => {
  return <DottedRect x={x} y={y} width={size} height={size} />;
};

export default DottedSquare;
