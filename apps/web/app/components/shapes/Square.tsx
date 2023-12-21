import React, { useEffect, useRef } from "react";

interface RectangleProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Rectangle: React.FC<RectangleProps> = ({ x, y, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "black";
    context.strokeRect(x, y, width, height);
  }, [x, y, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    ></canvas>
  );
};

export default Rectangle;
