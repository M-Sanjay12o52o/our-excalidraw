import React, { useRef, useEffect, useState } from "react";

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [canvasSize, setCanvasSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });
  const isDrawing = useRef<boolean>(false);
  const [drawingPaths, setDrawingPaths] = useState<
    Array<Array<[number, number]>>
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 1;

    contextRef.current = context;

    redrawStoredPaths();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const saveDrawingPath = (x: number, y: number) => {
    if (!isDrawing.current || !canvasRef.current) return;

    const paths = [...drawingPaths];
    const currentPath = paths[paths.length - 1] || [];
    currentPath.push([x, y]);

    paths[paths.length - 1] = currentPath;
    setDrawingPaths(paths);
  };

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !contextRef.current) return;

    const canvas = canvasRef.current;
    const context = contextRef.current;

    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;

    context.beginPath();
    context.moveTo(offsetX, offsetY);
    isDrawing.current = true;

    saveDrawingPath(offsetX, offsetY);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !contextRef.current) return;

    const context = contextRef.current;

    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;

    context.lineTo(offsetX, offsetY);
    context.stroke();

    saveDrawingPath(offsetX, offsetY);
  };

  const finishDrawing = () => {
    if (!contextRef.current) return;

    contextRef.current.closePath();
    isDrawing.current = false;
  };

  const redrawStoredPaths = () => {
    if (!contextRef.current) return;

    drawingPaths.forEach((path) => {
      contextRef.current?.beginPath();
      path.forEach(([x, y], index) => {
        if (index === 0) {
          contextRef.current?.moveTo(x, y);
        } else {
          contextRef.current?.lineTo(x, y);
        }
      });
      contextRef.current?.stroke();
    });
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
