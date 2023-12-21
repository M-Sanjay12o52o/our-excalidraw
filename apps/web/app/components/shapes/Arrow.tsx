import React, { useEffect, useRef } from "react";

interface ArrowProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const Arrow: React.FC<ArrowProps> = ({ x1, y1, x2, y2 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "black";
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();

    const angle = Math.atan2(y2 - y1, x2 - x1);
    context.beginPath();
    context.moveTo(x2, y2);
    context.lineTo(
      x2 - 15 * Math.cos(angle - Math.PI / 6),
      y2 - 15 * Math.sin(angle - Math.PI / 6)
    );
    context.lineTo(
      x2 - 15 * Math.cos(angle + Math.PI / 6),
      y2 - 15 * Math.sin(angle + Math.PI / 6)
    );
    context.lineTo(x2, y2);
    context.fillStyle = "black";
    context.fill();
  }, [x1, y1, x2, y2]);

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

export default Arrow;
