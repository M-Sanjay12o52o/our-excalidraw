import React, { useRef, useEffect } from "react";

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawing = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // setting canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // drawing logics
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;

    contextRef.current = context;
  }, []);
  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !contextRef.current) return;

    const canvas = canvasRef.current;
    const context = contextRef.current;

    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;

    context.beginPath();
    context.moveTo(offsetX, offsetY);
    isDrawing.current = true;
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !contextRef.current) return;

    const canvas = canvasRef.current;
    const context = contextRef.current;

    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;

    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const finishDrawing = () => {
    if (!contextRef.current) return;

    contextRef.current.closePath();
    isDrawing.current = false;
  };

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: "auto",
      }}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={finishDrawing}
      onMouseOut={finishDrawing}
    ></canvas>
  );
};

export default CanvasComponent;
