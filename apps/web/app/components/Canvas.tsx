import React, { useEffect, useRef } from "react";

interface CanvasProps {
  mode: string;
}

const CanvasComponent: React.FC<CanvasProps> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawing = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = window.innerWidth + window.scrollX;
    canvas.height = window.innerHeight + window.scrollY;

    contextRef.current = context;

    const handleStartDrawing = (event: MouseEvent) => {
      isDrawing.current = true;
      const ctx = contextRef.current;
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(
          event.clientX + window.scrollX,
          event.clientY + window.scrollY
        );
      }
    };

    const handleDrawing = (event: MouseEvent) => {
      if (!isDrawing.current) return;
      const ctx = contextRef.current;
      if (ctx) {
        ctx.lineTo(
          event.clientX + window.scrollX,
          event.clientY + window.scrollY
        );
        ctx.stroke();
      }
    };

    const handleStopDrawing = () => {
      isDrawing.current = false;
      const ctx = contextRef.current;
      if (ctx) {
        ctx.closePath();
      }
    };

    canvas.addEventListener("mousedown", handleStartDrawing);
    canvas.addEventListener("mousemove", handleDrawing);
    canvas.addEventListener("mouseup", handleStopDrawing);
    canvas.addEventListener("mouseout", handleStopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", handleStartDrawing);
      canvas.removeEventListener("mousemove", handleDrawing);
      canvas.removeEventListener("mouseup", handleStopDrawing);
      canvas.removeEventListener("mouseout", handleStopDrawing);
    };
  }, []);

  const drawShapes = (ctx: CanvasRenderingContext2D) => {
    switch (mode) {
      case "rectangle":
        ctx.fillRect(10, 20, 50, 30); // Example values for a rectangle
        break;

      case "square":
        ctx.fillRect(50, 70, 80, 80); // Example values for a square
        break;

      case "arrow":
        // ... (implementation still needed for arrow)
        break;

      case "dottedRect":
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(120, 10, 100, 60); // Example values for a dotted rectangle
        ctx.setLineDash([]);
        break;

      case "dottedSquare":
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(200, 80, 50, 50); // Example values for a dotted square
        ctx.setLineDash([]);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const ctx = contextRef.current;
    if (ctx) {
      drawShapes(ctx);
    }
  }, [mode]);

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
    ></canvas>
  );
};

export default CanvasComponent;
